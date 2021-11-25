let todo_items = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John '}
];

$(function() {
  let todoTemplate = Handlebars.compile($('#todoTemplate').html());
  let contextTemplate = Handlebars.compile($('#contextMenu').html());

  let $list = $('ul');

  $list.html(todoTemplate({ todos: todo_items }));

  let $delete = $('.delete');
  let $modal = $('#modal-bg');
  $modal.hide();
  let idToDelete;
  let $modalBox = $('#modal-box');

  $delete.on('click', function(event) {
    idToDelete = $(this.parentNode).attr('data-id');

    $modal.show();
  })

  $modal.on('click', function(event) {
    $modal.hide();
  })

  $modalBox.on('click', function(event) {
    event.stopPropagation();

    if ($(event.target).attr('id') === 'yes') {
      deleteLi(idToDelete);
      $modal.hide();
    } else if ($(event.target).attr('id') === 'no') {
      $modal.hide();
    }
  })

  let $todos = $('li');

  $todos.on('contextmenu', function(event) {
    event.preventDefault();
    if ($('#context').length > 0) {
      $('#context').remove();
    }
    let $todo = $(event.currentTarget);

    let $contextMenu = $(document.createElement('ul'));
    $contextMenu.attr('id', 'context');
    $contextMenu.html(contextTemplate({ id: $todo.attr('data-id') }));
    $contextMenu.css({
      "left": event.pageX + 'px',
      "top": event.pageY + 'px'
    });
    $todo.append($contextMenu);
  })

  $('html').on('click', function(event) {
    if ($('#context').length > 0) {
      $('#context').remove();
    }
    let $target = $(event.target);

    if ($target.attr('id') === 'context-delete') {
      let $todo = $(`#todos li[data-id=${$target.attr('data-id')}]`);
      let $delete = $($todo.children('img')[0]);
      $delete.trigger('click');
    }
  })
})

function deleteLi(id) {
  let li = $(`li[data-id=${id}]`);
  li.remove();
}
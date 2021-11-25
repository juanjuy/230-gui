const languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
    'general-purpose programming language. It was designed and developed in the mid-1990s ' +
    'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
    'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
    'including functional, object-oriented, and imperative. It also has a dynamic type ' +
    'system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
    'programming language. It has been standardized in the ECMAScript language ' +
    'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
    'technologies of World Wide Web content production; the majority of websites employ ' +
    'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
    'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
    'supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
    'with a long history and a distinctive, fully parenthesized prefix notation. ' +
    'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
    'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
    'since its early days, and many dialects have existed over its history. Today, the best '+
    'known general-purpose Lisp dialects are Common Lisp and Scheme.'
  }
];

$(function() {
  languages.forEach(lang => {
    let div = document.createElement('div');
    div.classList.add('lang');
    div.dataset.lang = lang.name;

    let h2 = document.createElement('h2');
    h2.textContent = lang.name;
    let p = document.createElement('p');
    p.textContent = lang.description.slice(0, 120) + '...';

    let button = document.createElement('button');

    button.innerHTML = 'Show More';
    button.classList.add('more');

    div.append(h2, p, button);
    $('main').append(div);
  });

  $('main').on('click', 'button', function(event) {
    let $this = $(this);
    let lang = $this.parent().data('lang');
    let p = $this.prevAll('p');
    if ($this.text() === 'Show More') {
      let content = getLangDescription(lang);
      p.text(content);
      $this.text('Show Less');
    } else if ($this.text() === 'Show Less') {
      let content = getLangDescription(lang).slice(0, 120) + '...';
      p.text(content);
      $this.text('Show More');
    }
  })
})

function getLangDescription(language) {
  for (let lang of languages) {
    if (lang.name === language) {
      return lang.description;
    }
  }
}
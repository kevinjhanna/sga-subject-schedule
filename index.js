const searchPage = Array.from(document.querySelectorAll('a')).filter(a => a.innerText === 'Cursos')[0]

// Every link

Array.from(document.querySelectorAll('.subjectBackground')).forEach(e => { 
  const cell = e.querySelector('td');
  const subjectCode = cell.querySelector('span.bold').innerText.match(/[0-9]{2}\.[0-9]{2}/)[0];
  cell.innerHTML = `<a href=foo'>${cell.innerHTML}</a>`
})

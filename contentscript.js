const send = (request, callback = (response => {})) => (
  chrome.extension.sendMessage(request, callback)
)

const getLink = (text) => (
  Array.from(document.querySelectorAll('a')).filter(a => a.innerText === text)[0]
)

const createShortcutLinks = () => {
  Array.from(document.querySelectorAll('.subjectBackground')).forEach(e => { 
    const cell = e.querySelector('td')
    const subjectCode = cell.querySelector('span.bold').innerText.match(/[0-9]{2}\.[0-9]{2}/)[0]
    const link = document.createElement('a')
    Array.from(cell.childNodes).forEach(child => link.appendChild(child))
    link.href = '#'
    link.addEventListener("click", () => openSearchPage(subjectCode), false);

    cell.innerHTML = null
    cell.appendChild(link)
  })
}

const openSearchPage = (subjectCode) => {
  send({ type: 'storeSubjectCode', subjectCode: subjectCode })
  window.location = getLink('Cursos').href
}

const semesterFilterValue = () => {
  const month = (new Date()).getMonth() + 1
  if (month > 5 && month < 11) {
    return 1 // You are looking for second semester info
  } else {
    return 0 // You are looking for first semester info
  }
}

const searchSubject = (subjectCode) => {
  // Subject code filter
  document.querySelector('.filters-tr .filter-td input').value = subjectCode

  // Semester filter
  Array.from(document.querySelectorAll('.filters-tr .filter-td select')).filter(s => {
    const options = Array.from(s.querySelectorAll('option')).map(o => o.innerText)
    return options.includes('Primer Cuat.', 'Segundo Cuat.')
  })[0].value = semesterFilterValue()

  document.querySelector('a[title=Filtrar]').click()
  send({ type: 'hasSearchedPage' })
}

const clickResults = (subjectCode) => {
  send({ type: 'hasFoundSubjectPage' })
  document.querySelector('tr img[title="Ver Detalles"]').click()
}

const showSchedules = () => {
  send({ type: 'stop' })
  getLink('Comisiones').click()
}

send({ type: 'requestAction' }, (response) => {
  switch (response.nextStep) {
    case 'searchSubject':
      searchSubject(response.subjectCode)
      break;
    case 'clickResults':
      clickResults(response.subjectCode)
      break;
    case 'showSchedules':
      showSchedules()
      break
  }
})

createShortcutLinks()

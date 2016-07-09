let subjectCode = null
let nextStep = null;

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request.type) {
    case 'storeSubjectCode':
      subjectCode = request.subjectCode
      nextStep = 'searchSubject'
      sendResponse({})
      break
    case 'hasSearchedPage':
      nextStep = 'clickResults'
      sendResponse({})
      break
    case 'hasFoundSubjectPage':
      nextStep = 'showSchedules'
      sendResponse({})
      break
    case 'requestAction':
      sendResponse({ nextStep: nextStep, subjectCode: subjectCode })
      break
    case 'stop':
      subjectCode = null
      nextStep = null
      break
  }
});

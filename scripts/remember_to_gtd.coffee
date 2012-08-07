debug_mode = true
debug = (message) -> alert message if debug_mode
byId = (id) -> document.getElementById(id)
create = (tag) -> document.createElement(tag)

createLeftColumn = () ->
  if byId('leftColumn')
    return
  leftColumn = create('div')
  leftColumn.setAttribute('id','leftColumn')
  appView = byId("appview")
  listBox = byId("listbox")
  appView.insertBefore(leftColumn, listBox) if appView and listBox

createListTabsContainer = () ->
  if byId('listTabsBox')
    return
  listTabsBox = create('div')
  listTabsBox.setAttribute('id','listTabsBox')
  leftColumn = byId("leftColumn")
  if leftColumn
    listTabsBox.innerHTML = ' <div class="white_rbroundbox"> <div class="white_rbtop"> <div> <div></div> </div> </div> <div class="white_rbcontentwrap"> <div class="white_rbcontent"> <div class="taskcloudcontent" id="listtabscontainer"> </div> </div> </div> <div class="white_rbbot"> <div><div></div> </div> </div> </div> ';
    leftColumn.appendChild(listTabsBox)

moveListTabs = () ->
  listTabs = byId("listtabs")
  if listTabs
    listTabs.className = ""
    listTabsContainer = byId("listtabscontainer")
    listTabsContainer.appendChild(listTabs) if listTabsContainer 

moveSettingsTabs = () ->
  settingsTabs = byId('settingstabs')
  if settingsTabs
    settingsTabs.className = ""
    listTabsContainer = byId("listtabscontainer")
    listTabsContainer.appendChild(settingsTabs) if listTabsContainer

moveTabsToTheLeft = () ->
  createLeftColumn()
  createListTabsContainer()
  moveListTabs()
  moveSettingsTabs()

runApp = () ->
  moveTabsToTheLeft()

waitForIt = () ->
  if byId('appview') == null
    setTimeout(waitForIt,1000)
  else
    runApp()

waitForIt()
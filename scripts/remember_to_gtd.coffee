debug_mode = true
debug = (message) -> alert message if debug_mode

badgeCounterListName = 'Today' # name of the list wich taskCount will be used for badge

# Helper fuctions
byId = (id) -> document.getElementById(id)
create = (tag) -> document.createElement(tag)
addCssClass = (tag, klass) -> tag.setAttribute('class',tag.className+' '+klass)

# Identify tipe of list from its name
isNextActionList = (listName) -> listName.indexOf('@') == 0
isWaitingList = (listName) -> listName == 'Waiting'
isTodayList = (listName) -> listName == 'Today'
isProjectList = (listName) -> listName.indexOf('pj-') == 0

createLeftColumn = () ->
  if byId('leftColumn')
    return # div already created
  leftColumn = create('div')
  leftColumn.setAttribute('id','leftColumn')
  appView = byId("appview")
  listBox = byId("listbox")
  appView.insertBefore(leftColumn, listBox) if appView and listBox

createListTabsContainer = () ->
  if byId('listTabsBox')
    return # div already created
  listTabsBox = create('div')
  listTabsBox.setAttribute('id','listTabsBox')
  leftColumn = byId("leftColumn")
  if leftColumn
    listTabsBox.innerHTML = ' <div class="white_rbroundbox"> <div class="white_rbtop"> <div> <div></div> </div> </div> <div class="white_rbcontentwrap"> <div class="white_rbcontent"> <div class="taskcloudcontent" id="listtabscontainer"> </div> </div> </div> <div class="white_rbbot"> <div><div></div> </div> </div> </div> ';
    leftColumn.appendChild(listTabsBox)

moveTabs = (id) ->
  tabs = byId(id)
  if tabs
    tabs.className = ""
    listTabsContainer = byId("listtabscontainer")
    listTabsContainer.appendChild(tabs) if listTabsContainer

moveTabsToTheLeft = () ->
  createLeftColumn()
  createListTabsContainer()
  moveTabs(id) for id in ['listtabs'] #, 'settingstabs', 'contacttabs']

setClasses = () ->
  listTabs = byId('listtabs')
  for li in listTabs.getElementsByTagName('li')
    # TODO estas classes se pierden cuando el usuario hace click en la lista.
    listName = li.firstChild.innerHTML
    if isNextActionList(listName)
      addCssClass(li, 'gtd-list')
      addCssClass(li,'next-actions-list')
    if isWaitingList(listName)
      addCssClass(li, 'gtd-list')
      addCssClass(li, 'waiting-list')
    if isTodayList(listName)
      addCssClass(li, 'gtd-list')
      addCssClass(li, 'today-list')
    if isProjectList(listName)
      addCssClass(li, 'gtd-list')
      addCssClass(li, 'project-list')

# This function uses som RTM js objects:
#   - listTabs
#   - overviewList
#   - format
taskCounts = () ->
  fog = new fogger.Fogger()
  if window.listTabs and window.overviewList and window.format
    list_lis = window.listTabs.div.getElementsByTagName('li')
    for list_data, i in window.listTabs.data
      count = 0
      if (query = list_data[2])
        # smartLists store query on data[2]
        if query.indexOf("status:") < 0
          query = "("+query+") and (status: incomplete)"
        count = window.overviewList.getFilteredList(query).length
      else
        # a normal list, without query
        count = window.format.getListStatistics(list_data[1])[5]

      if count > 0
        list_lis[i].innerHTML = list_lis[i].innerHTML + "(" + count + ")"

      if window.listTabs.entries[i] == badgeCounterListName
        fog.setCount(count)
        fog.setCountVisible(true)

#overrideListTabsBlitDiv = () ->
#  if window.listTabs
#    oldBlitDiv = window.listTabs.blitDiv
#    window.listTabs.blitDiv = () ->
#      oldBlitDiv.call(window.listTabs)
#      setClasses()
#      taskCounts()

setupApp = () ->
  moveTabsToTheLeft()
  setClasses()
  setTimeout(taskCounts,1000) # wait for window.format

window.addEventListener('load',setupApp,false)
#window.addEventListener('load',overrideListTabsBlitDiv,false)
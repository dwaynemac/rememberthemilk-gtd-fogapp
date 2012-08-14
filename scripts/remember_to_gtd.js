(function() {
  var addCssClass, byId, create, createLeftColumn, createListTabsContainer, debug, debug_mode, isNextActionList, isProjectList, isTodayList, isWaitingList, moveTabs, moveTabsToTheLeft, overrideListTabsBlitDiv, setClasses, setupApp, taskCounts;

  debug_mode = true;

  debug = function(message) {
    if (debug_mode) return alert(message);
  };

  byId = function(id) {
    return document.getElementById(id);
  };

  create = function(tag) {
    return document.createElement(tag);
  };

  addCssClass = function(tag, klass) {
    return tag.setAttribute('class', tag.className + ' ' + klass);
  };

  isNextActionList = function(listName) {
    return listName.indexOf('@') === 0;
  };

  isWaitingList = function(listName) {
    return listName === 'Waiting';
  };

  isTodayList = function(listName) {
    return listName === 'Today';
  };

  isProjectList = function(listName) {
    return listName.indexOf('pj-') === 0;
  };

  createLeftColumn = function() {
    var appView, leftColumn, listBox;
    if (byId('leftColumn')) return;
    leftColumn = create('div');
    leftColumn.setAttribute('id', 'leftColumn');
    appView = byId("appview");
    listBox = byId("listbox");
    if (appView && listBox) return appView.insertBefore(leftColumn, listBox);
  };

  createListTabsContainer = function() {
    var leftColumn, listTabsBox;
    if (byId('listTabsBox')) return;
    listTabsBox = create('div');
    listTabsBox.setAttribute('id', 'listTabsBox');
    leftColumn = byId("leftColumn");
    if (leftColumn) {
      listTabsBox.innerHTML = ' <div class="white_rbroundbox"> <div class="white_rbtop"> <div> <div></div> </div> </div> <div class="white_rbcontentwrap"> <div class="white_rbcontent"> <div class="taskcloudcontent" id="listtabscontainer"> </div> </div> </div> <div class="white_rbbot"> <div><div></div> </div> </div> </div> ';
      return leftColumn.appendChild(listTabsBox);
    }
  };

  moveTabs = function(id) {
    var listTabsContainer, tabs;
    tabs = byId(id);
    if (tabs) {
      tabs.className = "";
      listTabsContainer = byId("listtabscontainer");
      if (listTabsContainer) return listTabsContainer.appendChild(tabs);
    }
  };

  moveTabsToTheLeft = function() {
    var id, _i, _len, _ref, _results;
    createLeftColumn();
    createListTabsContainer();
    _ref = ['listtabs'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      id = _ref[_i];
      _results.push(moveTabs(id));
    }
    return _results;
  };

  setClasses = function() {
    var li, listName, listTabs, _i, _len, _ref, _results;
    listTabs = byId('listtabs');
    _ref = listTabs.getElementsByTagName('li');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      li = _ref[_i];
      listName = li.firstChild.innerHTML;
      if (isNextActionList(listName)) {
        addCssClass(li, 'gtd-list');
        addCssClass(li, 'next-actions-list');
      }
      if (isWaitingList(listName)) {
        addCssClass(li, 'gtd-list');
        addCssClass(li, 'waiting-list');
      }
      if (isTodayList(listName)) {
        addCssClass(li, 'gtd-list');
        addCssClass(li, 'today-list');
      }
      if (isProjectList(listName)) {
        addCssClass(li, 'gtd-list');
        _results.push(addCssClass(li, 'project-list'));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  taskCounts = function() {
    var count, i, list_data, list_lis, query, _len, _ref, _results;
    if (window.listTabs) {
      list_lis = window.listTabs.div.getElementsByTagName('li');
      _ref = window.listTabs.data;
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        list_data = _ref[i];
        count = 0;
        if ((query = list_data[2])) {
          if (query.indexOf("status:") < 0) {
            query = "(" + query + ") and (status: incomplete)";
          }
          count = window.overviewList.getFilteredList(query).length;
        } else {
          count = window.format.getListStatistics(list_data[1])[5];
        }
        if (count > 0) {
          _results.push(list_lis[i].innerHTML = list_lis[i].innerHTML + "(" + count + ")");
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  overrideListTabsBlitDiv = function() {
    var oldBlitDiv;
    if (window.listTabs) {
      oldBlitDiv = window.listTabs.blitDiv;
      return window.listTabs.blitDiv = function() {
        oldBlitDiv.call(window.listTabs);
        setClasses();
        return taskCounts();
      };
    }
  };

  setupApp = function() {
    moveTabsToTheLeft();
    setClasses();
    return taskCounts();
  };

  window.addEventListener('load', setupApp, false);

}).call(this);

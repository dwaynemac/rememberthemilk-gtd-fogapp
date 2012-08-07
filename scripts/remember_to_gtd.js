(function() {
  var byId, create, createLeftColumn, createListTabsContainer, debug, debug_mode, moveListTabs, moveSettingsTabs, moveTabsToTheLeft, runApp, waitForIt;

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

  moveListTabs = function() {
    var listTabs, listTabsContainer;
    listTabs = byId("listtabs");
    if (listTabs) {
      listTabs.className = "";
      listTabsContainer = byId("listtabscontainer");
      if (listTabsContainer) return listTabsContainer.appendChild(listTabs);
    }
  };

  moveSettingsTabs = function() {
    var listTabsContainer, settingsTabs;
    settingsTabs = byId('settingstabs');
    if (settingsTabs) {
      settingsTabs.className = "";
      listTabsContainer = byId("listtabscontainer");
      if (listTabsContainer) return listTabsContainer.appendChild(settingsTabs);
    }
  };

  moveTabsToTheLeft = function() {
    createLeftColumn();
    createListTabsContainer();
    moveListTabs();
    return moveSettingsTabs();
  };

  runApp = function() {
    return moveTabsToTheLeft();
  };

  waitForIt = function() {
    if (byId('appview') === null) {
      return setTimeout(waitForIt, 1000);
    } else {
      return runApp();
    }
  };

  waitForIt();

}).call(this);

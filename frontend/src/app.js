import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import { siteRoot } from './utils/constants';
import SidePanel from './components/side-panel';
import MainPanel from './components/main-panel';
import DraftsView from './pages/drafts/drafts-view';
import DraftContent from './pages/drafts/draft-content';
import ReviewContent from './pages/drafts/review-content';
import FilesActivities from './pages/dashboard/files-activities';
import Starred from './pages/starred/starred';
import editUtilties from './utils/editor-utilties';

import 'seafile-ui';
import './assets/css/fa-solid.css';
import './assets/css/fa-regular.css';
import './assets/css/fontawesome.css';
import './css/layout.css';
import './css/toolbar.css';
import './css/search.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isSidePanelClosed: false,
      draftCounts: 0,
      draftList:[]
    };
  }

  componentDidMount() {
    this.getDrafts()
  }

  getDrafts = () => {
    editUtilties.listDrafts().then(res => {
      this.setState({
        draftCounts: res.data.draft_counts,
        draftList: res.data.data 
      })  
    })
  }

  onCloseSidePanel = () => {
    this.setState({
      isSidePanelClosed: !this.state.isSidePanelClosed
    });
  }

  onShowSidePanel = () => {
    this.setState({
      isSidePanelClosed: !this.state.isSidePanelClosed
    });
  }

  render() {

    let href = window.location.href.split('/');
    let currentTab = href[href.length - 2];

    return (
      <div id="main">
        <SidePanel isSidePanelClosed={this.state.isSidePanelClosed} onCloseSidePanel={this.onCloseSidePanel} currentTab={currentTab} draftCounts={this.state.draftCounts} />

        <MainPanel onShowSidePanel={this.onShowSidePanel}>
          <Router>
            <FilesActivities path={siteRoot + 'dashboard'} />
            <DraftsView path={siteRoot + 'drafts'}  currentTab={currentTab}>
              <DraftContent path='/' getDrafts={this.getDrafts} draftList={this.state.draftList}/>
              <ReviewContent path='reviews' />
            </DraftsView>
            <Starred path={siteRoot + 'starred'} />
          </Router>
        </MainPanel>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('wrapper')
);
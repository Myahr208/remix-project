import { faCaretDown, faCaretRight, faArrowRightArrowLeft, faGlobe, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import { gitActionsContext } from "../../state/context";
import { branch, remote } from "../../types";
import { gitPluginContext } from "../gitui";

interface RemotesDetailsNavigationProps {
  eventKey: string;
  activePanel: string;
  callback: (eventKey: string) => void;
  remote: remote;
}

export const RemotesDetailsNavigation = (props: RemotesDetailsNavigationProps) => {
  const { eventKey, activePanel, callback, remote } = props;
  const context = React.useContext(gitPluginContext)
  const actions = React.useContext(gitActionsContext)
  
  const handleClick = () => {
    if (!callback) return
    if (activePanel === eventKey) {
      callback('')
    } else {
      callback(eventKey)
    }
  }

  const openRemote = () => {
    window.open(`${remote.url}`, '_blank');
  }

  const setAsDefault = () => {
    actions.setDefaultRemote(remote)
  }

  return (
    <>
      <div className="d-flex flex-row w-100 mb-2 mt-2">
        <div onClick={() => handleClick()} role={'button'} className='pointer d-flex flex-row w-100 commit-navigation'>
          {
            activePanel === eventKey ? <FontAwesomeIcon className='' icon={faCaretDown}></FontAwesomeIcon> : <FontAwesomeIcon className='' icon={faCaretRight}></FontAwesomeIcon>
          }
          <div className="long-and-truncated pl-1">
          {remote.remote}  <FontAwesomeIcon className='' icon={faArrowRightArrowLeft}></FontAwesomeIcon> {remote.url}
          </div>

        </div>
        {context.defaultRemote && context.defaultRemote?.url === remote.url ?
          <FontAwesomeIcon className='ml-auto mr-1 pointer text-success' icon={faToggleOff} ></FontAwesomeIcon>
          :
          <FontAwesomeIcon className='ml-auto mr-1 pointer' icon={faToggleOn} onClick={setAsDefault} ></FontAwesomeIcon>
        }
        {remote?.url && <FontAwesomeIcon className='ml-2 pointer' icon={faGlobe} onClick={() => openRemote()}></FontAwesomeIcon>}
      </div>
    </>
  );
}
import React from 'react'
import {fillStringLength} from '../__helper__/text-helper'
import TypeAnimation from 'react-type-animation'
export function MainContent({
                          showConversationDebug,
                          conversation,
                          loading,
                          conversationHistory,
                          aiName,
                        }) {
  const apiKey = "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";

  function getBotMessage(msg, index, length) {
    if (msg.text === 'No response') {
      return <span className={'fuschia'}>
        {fillStringLength(aiName, 'Human')}
        <i className={'grey'}>{'// No Response'}</i>
        </span>
    } else {
      return <span className={'green'}>
        {index === length - 1 ? <TypeAnimation cursor={false}
                                               sequence={[msg.text]}
                                               wrapper={'span'}
        /> : msg.text}
      </span>
    }
  }


  if (!showConversationDebug) {
    if (apiKey === '' && !loading) {
      return <center>
        <span className={'fuschia'}>Veuillez coller votre clef d'API</span>
        <br/>
        <a href={'mailto:contact@messiezconseilformation.fr'} target={'_blank'} className={'blue hover'}>
          Cliquer ici pour en faire la demande
        </a>
        <br/>
      </center>
    }
    if (conversationHistory.length === 0 && !loading) {
      return <center className={'green'}>Poser moi vos question je vous répond<br/></center>
    }
    return <>
      {conversationHistory.map((msg, index) => {
        return <div key={index}>
          {msg.from}: {msg.from === 'Human'
          ? <span className={'blue'}>{fillStringLength('Human', aiName)}{msg.text}</span>
          : getBotMessage(msg, index, conversationHistory.length)}
        </div>
      })}
    </>
  } else {
    return <>
      <div>
          <pre>
            {conversation}
            <hr/>
            {JSON.stringify(conversationHistory, null, 2)}
          </pre>
      </div>
    </>
  }
}

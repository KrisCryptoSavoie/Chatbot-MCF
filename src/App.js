import React, { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { AsideSection } from './navigation/AsideSection';
import { Loader } from './Loader';
import { SettingsSection } from './chat/SettingsSection';
import { fillStringLength } from './__helper__/text-helper';
import { MainContent } from './chat/ChatSection';

function defaultConversation(aiName, attributes) {
  return `Vous pouvez discuter avec l Inteligence Artificiel par MCF ${aiName}.
The AI is ${attributes}.\n\n`;
}

function getEngineId() {
  return 'text-davinci-003';
}

function App() {
  const [aiName, setAiName] = useState('MCF');
  const [tempAiName, setTempAiName] = useState('MCF');
  const [attributes, setAttributes] = useState('donne des informations');
  const [tempAttributes, setTempAttributes] = useState('donne des informations');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showConversationDebug, setShowConversationDebug] = useState(false);
  const [conversation, setConversation] = useState(defaultConversation(aiName, attributes));
  const [question, setQuestion] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [apiKey, setApiKey] = useState('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');
  const [tempApiKey, setTempApiKey] = useState('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');

  function getPrompt(question) {
    return `${conversation}Human:${question}\n${aiName}:`;
  }

  const askQuestion = (question) => {
    const configuration = new Configuration({ apiKey });
    const openai = new OpenAIApi(configuration);

    return new Promise((resolve, reject) => {
      openai
        .createCompletion(getEngineId(), {
          prompt: getPrompt(question),
          temperature: 0.5,
          max_tokens: 3000,
          top_p: 1.0,
          frequency_penalty: 0.2,
          presence_penalty: 0.0,
          stop: ['\n'],
        })
        .then((response) => {
          let text = response.data.choices[0].text;
          if (text && text.length > 0) {
            setConversation(`${getPrompt(question)}${text}\n`);
            resolve(text);
          } else {
            reject('No response');
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  function resetConversation() {
    setConversation(defaultConversation(aiName, attributes));
    setConversationHistory([]);
    setErrorMessage(null);
  }

  function saveConversationSettings(e) {
    e.preventDefault();
    setConversationHistory([]);
    setAiName(tempAiName);
    setAttributes(tempAttributes);
    setApiKey(tempApiKey);
    // save api key to local storage if it is not empty and not already saved
    if (tempApiKey && tempApiKey !== '' && localStorage.getItem('apiKey') !== temp
          {loading ? <>
              Human: <span className={'blue'}>
              {fillStringLength('Human', aiName)}
              {question}
            </span>
              <center>
                <Loader/>
              </center>
            </>
            : <>
              <br/>
              <br/>
            </>}

          <br/>

          <form onSubmit={poseQuestion}>
            <input type="text"
                   value={question}
                   placeholder={'Pose une Question...'}
                   spellCheck={false}
                   onChange={(e) => setQuestion(e.target.value)}/>
            {errorMessage && <span className={'fuschia'}>{errorMessage}</span>}
          </form>
        </div>
      </section>
      <AsideSection showConversationDebug={showConversationDebug}
                    setShowConversationDebug={setShowConversationDebug}/>
    </div>
  </div>
}


export default App

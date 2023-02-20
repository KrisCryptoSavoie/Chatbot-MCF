import React from 'react'

export function SettingsSection({
                           tempAiName,
                           aiName,
                           tempAttributes,
                           attributes,
                           onChangeAiName,
                           onChangeAttributes,
                           
                           
        
                           saveSettings,
                           resetConversation
                         }) 
    }
  }

  return <section id="aside" className="full md:half lg:quarter lg:screen-v-scroll flex row wrap">
    <div className="pt px">
      <form onSubmit={saveSettings}>
        <span className={tempAiName !== aiName ? 'fuschia' : 'orange'}>Nom du Chatbot</span>
        <input type="text"
               spellCheck={false}
               value={tempAiName}
               placeholder={'AI Name'}
               onChange={onChangeAiName}/>
        <br/>
        <br/>
        <span className={tempAttributes !== attributes ? 'fuschia' : 'orange'}>Type de demande</span>
        <input type="text"
               spellCheck={false}
               value={tempAttributes}
               placeholder={'Attributes'}
               onChange={onChangeAttributes}/>
        <br/>
        <br/>
      </form>
      
    </div>
  </section>
}

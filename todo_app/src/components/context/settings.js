import React, { useContext, useState } from 'react'

export const SettingsContext = React.createContext()

function Settings(props) {

   let [displayComplete, setDisplayComplete] = useState(false);
   let [itemScreen, setItemScreen] = useState(3);
   let [sort, setSort] = useState('')

   const contextState = {
     itemScreen: itemScreen,
     setItemScreen: setItemScreen,
     displayComplete: displayComplete,
     setDisplayComplete: setDisplayComplete,
     sort: sort,
     setSort: setSort
   }


  return (
    <SettingsContext.Provider value={contextState}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export default Settings
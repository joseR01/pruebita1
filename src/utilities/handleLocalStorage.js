
export function setLocalStorage(name,data) {

  if(!name) return console.log('necesitamos el nombre')
  if(!data) return console.log("necesitamos la data")
  
  let dataToString 

  if(typeof data !== 'string' | typeof data !== 'number') {
    dataToString = JSON.stringify(data)
  } else {
    dataToString = data
  }

  const datos = localStorage.setItem(name,dataToString)
  
  return datos
}

export function getLocalStorage(name) {
  if(!name) return console.log('necesitamos el nombre')
  
  const storage = localStorage.getItem(name)
  let datos
  if(storage) datos = JSON.parse(storage)
  if(!datos) return console.log('no se consiguio datos con estas carateristicas')
  return datos
}

export function deleteLocalStorage(name) {
  if(!name) return console.log('necesitamos el nombre')
  const storage = localStorage.removeItem(name)
}


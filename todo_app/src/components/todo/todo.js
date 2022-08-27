import { Button, Label, Switch, Card, Elevation } from '@blueprintjs/core'
import React, { useEffect, useState, useContext } from 'react'
import useForm from '../../hooks/form.js'

import { v4 as uuid } from 'uuid'

import {SettingsContext} from '../context/settings'

import './todo.css'

const getLoacalStorage = ()=>{
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}

const getLoacalStorageCount = ()=>{
  let count = localStorage.getItem('count');
  if(count){
    return count
  }
  else{
    return 0
  }
}

const ToDo = () => {
  const settings = useContext(SettingsContext)
  //console.log('---', settings.itemScreen)

  const [defaultValues] = useState({
    difficulty: 3,
  })
  const [pageNumber, setPageNumber] = useState(1);
  const [list, setList] = useState(getLoacalStorage())
  const [incomplete, setIncomplete] = useState([])
  //const [completeTask, setCompleteTask] = useState(false)
  //const [status, setStatus] = useState({id:'', status:false})
  const [count, setCount] = useState(0)

  // lab32
  const [countCard, setCountCard] = useState(7)



  const { handleChange, handleSubmit } = useForm(addItem, defaultValues)
  

  // Page Structure
  // 1 -> 3 in page 1 // 4 -> 6 in page 2 // ans so on ...
  const [firstCard, setFirstCard] = useState(0)
  const [lastCard, setLastCard] = useState(settings.itemScreen)

  function addItem(item) {

    
    if(count < countCard){
      setCount(count + 1)
      item.id = uuid()
      item.complete = false
      setList([...list, item])
    }
    
    //console.log(item)
    // console.log('---->', countCard)
    // console.log(' counts---->', count)
   
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id)
    setList(items)
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      console.log(item.complete)
      if (item.id == id) {
        item.complete = !item.complete
        console.log(item.complete)
        //setStatus({id: item.id, status:item.complete});
        if (item.complete) {
          setCount(count - 1)
        } else {
          setCount(count + 1)
        }
      }
      //return item
    })
    //return setList(items)
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete)
    setIncomplete(incompleteCount)
  }, [list])

    useEffect(() => {

      document.title = `To Do List Page: ${pageNumber}`
    }, [pageNumber])


  function pageStructure() {
    let cards = incomplete.slice(firstCard, lastCard);
    return cards;
  }

  function handleNextPage() {
    if (lastCard <= incomplete.length) {
      setPageNumber(pageNumber+1);
      setFirstCard(firstCard + settings.itemScreen)
      setLastCard(lastCard + settings.itemScreen)
    }
  }

  function handlePreviousPage() {
    if (firstCard > 0) {
      setPageNumber(pageNumber - 1)
      setFirstCard(firstCard - settings.itemScreen)
      setLastCard(lastCard - settings.itemScreen)
    }
  }

  // function handleHide() {
  //     settings.setDisplayComplete(!settings.displayComplete)
  // }

  // const handleStatus = (id)=>{
  //   console.log(list)
  //   console.log(id);
  //   let t = list.filter((item)=>item.id===id);
  //   console.log(t)
  //   t.complete = true
  //   console.log('sssd', t)
  //   if(t){
  //     if (status === 'pending') {
  //       setStatus('complete')
  //     }
  //     if (status === 'complete') {
  //       setStatus('pending')
  //     }
  //   }

  // }

  const h = ()=>{
    const items = list.map((item) => {
        item.complete = !item.complete
        setCount(count - 1)
    })
  }

  useEffect(() => {
    setFirstCard(0)
    setLastCard(settings.itemScreen)
  }, [settings.itemScreen])

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(count))
  }, [count])

  //console.log('-4-4-4--4-4--44--4', incomplete.length)
  return (
    <>
      <section className='form'>
        <header>
          <h1>To Do List: {count} items pending</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <h2 data-testid='add'>Add To Do Item</h2>

          <label>
            <span>To Do Item</span>
            <input
              onChange={handleChange}
              name='text'
              type='text'
              placeholder='Item Details'
            />
          </label>

          <label>
            <span>Assigned To</span>
            <input
              onChange={handleChange}
              name='assignee'
              type='text'
              placeholder='Assignee Name'
            />
          </label>

          <label>
            <span>Difficulty</span>
            <input
              onChange={handleChange}
              defaultValue={defaultValues.difficulty}
              type='range'
              min={1}
              max={5}
              name='difficulty'
            />
          </label>

          <label>
            <button type='submit' className='btn btn-success'>
              Add Item
            </button>
          </label>
          <br />
          <label>
            How many To Do Items to show at once: 
            <input
              type='number'
              name='amount'
              id='amount'
              value={countCard}
              onChange={(e) => {
                //console.log(e.target.value)
                setCountCard(e.target.value)
              }}
            />
          </label>
          <label class='container'>
            Check All
            <input type='checkbox' onClick={h}></input>
          </label>
        </form>

        {pageStructure().map((item) => (
          <div key={item.id}>
            {
              <>
                <p></p>

                <hr />

                <div className='card' key={item.id}>
                  <div
                    className={item.complete ? 'card-complete' : 'card-pending'}
                    key={item.id}
                  >
                    {item.complete ? 'complete' : 'pending'}
                  </div>
                  <div className='card-body' key={item.id}>
                    <p className='card-title'>Item: {item.text}</p>
                    <p className='card-text'>
                      <p>
                        <small>Assigned to: {item.assignee}</small>
                      </p>
                      <p>
                        <small>Difficulty: {item.difficulty}</small>
                      </p>
                    </p>
                    <Button onClick={() => deleteItem(item.id)}>Delete</Button>
                    <br />
                    <br />
                    <button
                      className='btn btn-primary'
                      onClick={() => toggleComplete(item.id)}
                    >
                      Change Status
                    </button>
                  </div>
                </div>
              </>
            }
          </div>
        ))}

        <nav aria-label='...'>
          <div>
            <Button className='btn btn-dark' onClick={handlePreviousPage}>
              Previous
            </Button>
            <Button
              type='button'
              className='btn btn-dark'
              onClick={handleNextPage}
            >
              NEXT
            </Button>
          </div>
        </nav>
      </section>
    </>
  )
}

export default ToDo

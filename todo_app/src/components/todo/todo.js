import { Button, Label, Switch, Card, Elevation } from '@blueprintjs/core'
import React, { useEffect, useState, useContext } from 'react'
import useForm from '../../hooks/form.js'

import { v4 as uuid } from 'uuid'

import {SettingsContext} from '../context/settings'

import './todo.css'

const ToDo = () => {
  const settings = useContext(SettingsContext)
  console.log('---', settings.itemScreen)

  const [defaultValues] = useState({
    difficulty: 3,
  })
  const [pageNumber, setPageNumber] = useState(1);
  const [list, setList] = useState([])
  const [incomplete, setIncomplete] = useState([])
  const [completeTask, setCompleteTask] = useState(false)

  const { handleChange, handleSubmit } = useForm(addItem, defaultValues)
  

  // Page Structure
  // 1 -> 3 in page 1 // 4 -> 6 in page 2 // ans so on ...
  const [firstCard, setFirstCard] = useState(0)
  const [lastCard, setLastCard] = useState(settings.itemScreen)

  function addItem(item) {
    item.id = uuid()
    item.complete = false
    //console.log(item)
    setList([...list, item])
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id)
    setList(items)
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete
      }
      return item
    })

    return setList(items)
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

  function handleHide() {
      settings.setDisplayComplete(!settings.displayComplete)
  }


  useEffect(() => {
    setFirstCard(0)
    setLastCard(settings.itemScreen)
  }, [settings.itemScreen])

  //console.log('-4-4-4--4-4--44--4', incomplete.length)
  return (
    <>
      <section className='form'>
        <header>
          <h1>To Do List: {incomplete.length} items pending</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <h2>Add To Do Item</h2>

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
        </form>

        {pageStructure().map((item) => (
          <div key={item.id}>
            {settings.hide === false || item.complete === false ? (
              <>
                <p></p>

                <hr />

                <div class='card'>
                  <div class='card-header'>pending</div>
                  <div class='card-body'>
                    <p class='card-title'>Item: {item.text}</p>
                    <p class='card-text'>
                      <p>
                        <small>Assigned to: {item.assignee}</small>
                      </p>
                      <p>
                        <small>Difficulty: {item.difficulty}</small>
                      </p>
                    </p>
                    <Button onClick={() => deleteItem(item.id)}>Delete</Button>
                    <br />
                    <a href='#' class='btn btn-primary'>
                      Go somewhere
                    </a>
                  </div>
                </div>
              </>
            ) : null}
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

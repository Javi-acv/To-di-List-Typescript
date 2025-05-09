import { useState, type JSX } from "react"
import { Todos } from "./componentes/Todos"
import {type FilterValue, type  TodoId, type TodoTitle, type Todo as TodoType} from "./types/types" 
import { TODO_FILTERS } from "./consts"
import { Footer } from "./componentes/Footer"
import { Header } from "./componentes/Header"


const mockTodos = [
  {
    id: '1',
    title: 'comer',
    completed: true,
  },
  {
    id: '2',
    title: 'kagar',
    completed: false,
  },
  {
    id: '3',
    title: 'dormir',
    completed: false,
  },
]


const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({id}: TodoId ): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted  = (
    { id, completed }: Pick<TodoType, 'id'|'completed'>
  ): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ... todo,
          completed
        }
      }

      return todo
    })

    setTodos(newTodos)
  } 
  
  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount= todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
      
    }
  )

  const handleAddTodo = ({title}: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }

    const newTodos = [... todos, newTodo]
    setTodos(newTodos)
  }

  return ( 
    <div className="todoapp">
    <Header onAddTodo={handleAddTodo} />
    <Todos 
    onToggleCompleteTodo={handleCompleted}
    onRemoveTodo={handleRemove}
    todos={filteredTodos} 
    />
    <Footer
      activeCount={activeCount}
      completedCount={completedCount}
      filterSelected={filterSelected}
      onClearCompleted={handleRemoveAllCompleted}
      handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import Todo from './Todo'

afterEach(() => {
  cleanup()
})

describe('Todo', () => {
  it('renders a not done todo with both action buttons', () => {
    const todo = {
      _id: '1',
      text: 'Study containers',
      done: false
    }

    render(
      <Todo
        todo={todo}
        deleteTodo={() => {}}
        completeTodo={() => {}}
      />
    )

    expect(screen.getByText('Study containers')).toBeTruthy()
    expect(screen.getByText('This todo is not done')).toBeTruthy()
    expect(screen.getByRole('button', { name: /delete/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /set as done/i })).toBeTruthy()
  })

  it('renders a done todo without the complete button', () => {
    const todo = {
      _id: '2',
      text: 'Ship the app',
      done: true
    }

    render(
      <Todo
        todo={todo}
        deleteTodo={() => {}}
        completeTodo={() => {}}
      />
    )

    expect(screen.getByText('Ship the app')).toBeTruthy()
    expect(screen.getByText('This todo is done')).toBeTruthy()
    expect(screen.getByRole('button', { name: /delete/i })).toBeTruthy()
    expect(screen.queryByRole('button', { name: /set as done/i })).toBeNull()
  })

  it('calls deleteTodo with the todo when delete is clicked', () => {
    const todo = {
      _id: '3',
      text: 'Remove old task',
      done: false
    }
    const deleteTodo = vi.fn()

    render(
      <Todo
        todo={todo}
        deleteTodo={deleteTodo}
        completeTodo={() => {}}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /delete/i }))

    expect(deleteTodo).toHaveBeenCalledTimes(1)
    expect(deleteTodo).toHaveBeenCalledWith(todo)
  })

  it('calls completeTodo with the todo when set as done is clicked', () => {
    const todo = {
      _id: '4',
      text: 'Finish exercise 14',
      done: false
    }
    const completeTodo = vi.fn()

    render(
      <Todo
        todo={todo}
        deleteTodo={() => {}}
        completeTodo={completeTodo}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /set as done/i }))

    expect(completeTodo).toHaveBeenCalledTimes(1)
    expect(completeTodo).toHaveBeenCalledWith(todo)
  })
})

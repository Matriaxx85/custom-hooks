import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';


const initialState = [];

const init = () => {
    return JSON.parse( localStorage.getItem('todos') ) || []; // Se intenta parsear el objeto, si es null, se retorna el arreglo vacío
}

export const useTodo = () => {

    const [ todos, dispatch ] = useReducer( todoReducer, initialState, init );

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ) );
    }, [todos])

    // const todosCount = () => {
    //     return todos.length
    // }

    // const pendingTodosCount = () => {
    //     return todos.filter( todo => !todo.done ).length
    // }

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch( action ) // Función que se utilizará para mandar la acción
    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }

    const handleToggleTodo = ( id ) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        })
    }

    return {
        todos, 
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done ).length,
        handleDeleteTodo, 
        handleToggleTodo, 
        handleNewTodo
    }
}

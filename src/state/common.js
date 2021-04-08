const editState = oldState => changes => ({...oldState, ...changes})

export {
    editState
}
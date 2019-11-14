
export const getItemStyle = (isDragging : any, draggableStyle : any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle
});


// a little function to help us with reordering the result
export const reorder = (list : any, startIndex : number, endIndex : number) => {
    console.log(list)
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
export const move = (source : any, destination : any, droppableSource : any, droppableDestination : any) => {

    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    console.log(sourceClone)
    const [removed] = sourceClone.splice(droppableSource.index, 1);  //remove from source
    console.log(sourceClone);
    destClone.splice(droppableDestination.index, 0, removed); // add to destionation

    const result : any = {};
    const sourceResult : any = {id : droppableSource.droppableId , items : sourceClone};
    const destResult : any = {id : droppableDestination.droppableId , items : destClone};
    console.log([sourceResult , destResult]);
    return [sourceResult , destResult , removed];
};

const grid = 8;


export const getListStyle = (isDraggingOver : any) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: "100%"
});
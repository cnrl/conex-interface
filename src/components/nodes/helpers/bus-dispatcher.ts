export const onDragStart = <T extends string>(nodeType: T): React.DragEventHandler<HTMLDivElement> => {
  return event => {
    // pass color as a data to be stored in the ui
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    // const img = new Image();
    // img.src = 'https://picsum.photos/20/';
    // event.dataTransfer.setDragImage(img, 10, 10);
  };
};

<!-- source: https://www.leaferjs.com/ui/en/reference/list/LeafList.html -->

# LeafList 

LeafList high-performance element list class.

Elements can be quickly found via innerId.

## Key Properties 

### list: `ILeaf`[] 

The actual element list.

### keys: `INumberMap` 

Index object, used to index elements via innerId.

## Readonly Properties 

### length: number 

The number of elements.

## Key Methods 

### has ( leaf: `ILeaf`): `boolean` 

Checks whether an element exists.

### add ( leaf: `ILeaf`) 

Adds an element.

### addAt ( leaf: `ILeaf`, index: `number`) 

Adds an element at the specified position.

### addList ( list: `ILeaf`[]) 

Adds a group of elements.

### remove ( leaf: `ILeaf`) 

Removes an element.

### indexAt ( index: `number`):`ILeaf` 

Gets the element at the specified position.

### indexOf ( leaf: `ILeaf`): `number` 

Gets the position of an element.

### forEach ( itemCallback: `IFunction`) 

Iterates over elements.

### clone ( ): `LeafList` 

Clones a LeafList object.

### update ( ) 

Updates element indices.

### reset ( ) 

Resets the list.

### destroy ( ) 

Destroys the list.

## API 

### LeafList 

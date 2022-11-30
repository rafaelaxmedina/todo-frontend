import React, { useEffect } from 'react'
import './App.css';

import * as ProductService from './service/products'

const App = () => {
  const [itens, setItens] = React.useState([]);
  const [item, setItem] = React.useState("");
  const [itemEditing, setItemEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  useEffect(() => {
    ProductService.getAll().then((items) => {
      setItens(items)
    })

  }, [])

  function refreshPage() {
    document.location.reload(true)
  }

  function handleSubmit(e) {
    e.preventDefault();

    ProductService.create(item).then(
      refreshPage()
    )
  }

  function deleteItem(id) {
    ProductService.deleteItem(id).then((updatedList) => {
      setItens(updatedList)
      refreshPage()
    })
  }

  function toggleComplete(id) {
    let updatedItens = [...itens].map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setItens(updatedItens);
  }

  function submitEdits(id) {
    ProductService.updateList(id, editingText).then((updatedItens) => {
      setItens(updatedItens);
      setItemEditing(null);
      refreshPage()
    })
  }

  return (
    <div>
      <div className="list">
      <h1>Lista de compras</h1>
      <div className="note-purchase">
      <form onSubmit={handleSubmit}>
        <input
          className="write"
          type="text"
          onChange={(e) => setItem(e.target.value)}
          value={item}
        />
        <button className='note' type="submit">Anotar Compra</button>
      </form>
      </div>
      {itens.map((item) => (
        <div key={item.id} >
          <div className="buy-item">
            <input className="checkbox"
              type="checkbox"
              id="completed"
              checked={item.completed}
              onChange={() => toggleComplete(item.id)}
            />
            {item.id === itemEditing ? (
              <input
                className="text"
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{item.name}</div>
            )}
          </div>
          <div className="buylist-actions">
            {item.id === itemEditing ? (
              <button className='confirm-edit' onClick={() => submitEdits(item.id)}>Confirmar edição</button>
            ) : (
              <button className='edit' onClick={() => setItemEditing(item.id)}>Editar</button>
            )}

            <button className='delete' onClick={() => deleteItem(item.id)}>Excluir</button>
          </div>
        </div>
      ))}
      </div>
    </div>

  );
};

export default App;
const getClass = what => document.querySelector(what)

let tarefas = [{
  name: 'Exemplo de tarefa',
  id: Math.floor(Math.random() * 9999)
}]

const render = () => {
  getClass(`.lista`)
    .innerHTML = tarefas.map(e => `
      <div class="item">
        <h2>${e.name}</h2>
        <button onClick="del(${e.id})">Excluir</button>
      </div>
    `)
}

const del = what => {
  tarefas = tarefas.filter(e => e.id !== what)
  
  saveDb()
  render()
}

getClass(`.form`)
  .addEventListener(`submit`, e => {
    e.preventDefault()
    
    tarefas = [...tarefas, {
      name: getClass(`.input`).value,
      id: Math.floor(Math.random() * 9999)
    }]
    
    saveDb()
    render()
    
    getClass(`.input`).value = ``
  })

const saveDb = () => {
  localStorage.setItem('lista', JSON.stringify(tarefas))
}

if(localStorage.getItem(`lista`) === null || localStorage.getItem(`lista`) === [] ) {
  render()
} else {
  tarefas = JSON.parse(localStorage.getItem(`lista`))
  
  render()
}
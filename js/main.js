const getClass = what => document.querySelector(what)
const newData = () => {
  let dataAtual = new Date();
  let dia = dataAtual.getDate();
  let mes = (dataAtual.getMonth() + 1);
  let ano = dataAtual.getFullYear();
  let horas = dataAtual.getHours();
  let minutos = dataAtual.getMinutes();
  
  return `
      Criado dia ${dia}/${mes}/${ano}, as ${horas}:${minutos}h
    `
}

let tarefas = [{
  name: 'Exemplo de tarefa',
  id: Math.floor(Math.random() * 9999),
  create: newData()
}]

const render = () => {
  getClass(`.lista`)
    .innerHTML = tarefas.map(e => `
      <div class="item">
        <p>${e.create}</p>
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
      id: Math.floor(Math.random() * 9999),
      create: newData()
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
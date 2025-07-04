import Conteiner from './components/Conteiner';
import Card from './components/Card';
import './App.css';

function App() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: "16px",
        background: "#eaeaea",
        gap: "16px",
        boxSizing: "border-box",
      }}
    >
      <Conteiner titulo="Concluída" backgroundColor="green">
        <Card titulo="Tarefa 1" descricao="Descrição da tarefa 1." />
      </Conteiner>
      <Conteiner titulo="Pendente" backgroundColor="orange">
        <Card titulo="Tarefa 2" descricao="Descrição da tarefa 2." />
      </Conteiner>
      <Conteiner titulo="Não-concluída" backgroundColor="red" />
    </div>
  );
}

export default App;

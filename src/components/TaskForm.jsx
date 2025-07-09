import React, { useState } from 'react';

// Define o componente funcional 'TaskForm'.
// Ele recebe as propriedades 'darkMode' (para estilos) e 'onAddTask' (função para adicionar a tarefa).

const TaskForm = ({ darkMode, onAddTask }) => {

  // 'title' armazena o valor do campo de título da tarefa.
  // 'setTitle' é a função para atualizar o título.
  const [title, setTitle] = useState('');

  // 'description' armazena o valor do campo de descrição da tarefa.
  // 'setDescription' é a função para atualizar a descrição.
  const [description, setDescription] = useState('');

 
  // Função chamada quando o formulário é submetido.
  const handleSubmit = (e) => {
    // Previne o comportamento padrão do formulário, que recarregaria a página.
    e.preventDefault();
    // Verifica se o título não está vazio ou contém apenas espaços em branco.
    if (title.trim()) {
      // Chama a função 'onAddTask' passada pelo componente pai (App.jsx),
      // enviando um objeto com o título e a descrição da nova tarefa.
      onAddTask({ title, description });
      // Limpa os campos do formulário após a submissão bem-sucedida.
      setTitle('');
      setDescription('');
    }
  };

  return (
    // O elemento <form> que contém os campos de entrada e o botão de submissão.
    // O estilo é ajustado para ser minimalista e responsivo, e para se adaptar ao modo escuro.
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',             
        padding: '20px',
        marginBottom: '20px',   
        borderRadius: '10px',    
        backgroundColor: darkMode ? '#444' : '#fff',
        boxShadow: darkMode ? '0 4px 15px rgba(0, 0, 0, 0.4)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',          
        maxWidth: '500px',       
        boxSizing: 'border-box', 
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Campo de entrada para o título da tarefa */}
      <input
        type="text"
        placeholder="Título da Tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Atualiza o estado 'title' conforme o usuário digita.
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: `1px solid ${darkMode ? '#666' : '#ccc'}`, // Borda adaptável ao tema.
          // Cor de fundo e texto adaptáveis ao tema.
          backgroundColor: darkMode ? '#555' : '#f0f0f0',
          color: darkMode ? '#eee' : '#333',
          fontSize: '16px',
          transition: 'border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease',
        }}
      />
      {/* Campo de entrada para a descrição da tarefa */}
      <textarea
        placeholder="Descrição da Tarefa (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Atualiza o estado 'description'.
        rows="3" // Define o número de linhas visíveis para o textarea.
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: `1px solid ${darkMode ? '#666' : '#ccc'}`,
          backgroundColor: darkMode ? '#555' : '#f0f0f0',
          color: darkMode ? '#eee' : '#333',
          fontSize: '16px',
          resize: 'vertical', // Permite redimensionar verticalmente.
          transition: 'border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease',
        }}
      ></textarea>
      {/* Botão para adicionar a tarefa */}
      <button
        type="submit"
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          // Cores de fundo e texto do botão adaptáveis ao tema.
          backgroundColor: darkMode ? '#61dafb' : '#007bff',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease',
        }}
      >
        Adicionar Tarefa
      </button>
    </form>
  );
};

// Exporta o componente 'TaskForm' para que possa ser usado em outros arquivos.
export default TaskForm;

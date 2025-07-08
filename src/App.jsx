// Importa as funcionalidades necessárias da biblioteca React.
// 'useState' nos permite adicionar estado (dados que mudam) a componentes de função.
// 'useEffect' nos permite executar efeitos colaterais em componentes de função,
// como manipular o DOM (o corpo da página HTML) ou buscar dados.
import React, { useState, useEffect } from 'react';

// Importa o componente 'Conteiner' de um arquivo local.
// Este componente será usado para criar as colunas do nosso quadro Kanban.
import Conteiner from './components/Conteiner';

// Importa o componente 'Card' de um arquivo local.
// Este componente será usado para criar os itens (tarefas) dentro das colunas.
import Card from './components/Card';

// Importa o novo componente 'TaskForm' para criar novas tarefas.
import TaskForm from './components/TaskForm';

// Importa o arquivo de estilos CSS para este componente.
// Aqui definimos estilos globais e classes CSS para animações.
import './App.css';

// Define o componente principal da nossa aplicação, chamado 'App'.
// Em React, componentes de função são funções JavaScript que retornam JSX (HTML-like syntax).
function App() {
  // -------------------------------------------------------------------
  // Gerenciamento de Estado (Hooks useState)
  // -------------------------------------------------------------------

  // 'darkMode' é uma variável de estado que guarda um valor booleano (true/false).
  // 'setDarkMode' é a função que usamos para ATUALIZAR o valor de 'darkMode'.
  // 'useState(false)' define o valor inicial de 'darkMode' como 'false',
  // o que significa que o modo claro é o padrão quando o aplicativo inicia.
  const [darkMode, setDarkMode] = useState(false);

  // 'cards' é uma variável de estado que guarda um array de objetos.
  // Cada objeto representa um card (tarefa) no nosso quadro.
  // 'setCards' é a função para atualizar este array.
  // 'useState([...])' inicializa o array com alguns cards de exemplo,
  // cada um com um 'id' único, 'titulo', 'descricao' e a 'column' (coluna)
  // a que pertence.
  const [cards, setCards] = useState([
    { id: 'card-1', titulo: 'Tarefa 1', descricao: 'Descrição da tarefa 1.', column: 'Concluída' },
    { id: 'card-2', titulo: 'Tarefa 2', descricao: 'Descrição da tarefa 2.', column: 'Pendente' },
    { id: 'card-3', titulo: 'Tarefa 3', descricao: 'Descrição da tarefa 3', column: 'Pendente' },
    { id: 'card-4', titulo: 'Tarefa 4', descricao: 'Outra tarefa concluída.', column: 'Concluída' },
    { id: 'card-5', titulo: 'Tarefa 5', descricao: 'Tarefa a fazer.', column: 'Não-concluída' },
  ]);

  // 'draggingCardId' é uma variável de estado que armazena o 'id' do card
  // que está sendo arrastado no momento. Se nenhum card estiver sendo arrastado,
  // seu valor é 'null'.
  // 'setDraggingCardId' é a função para atualizar este ID.
  const [draggingCardId, setDraggingCardId] = useState(null);

  // 'deletingCardId' armazena o ID do card que está em processo de exclusão.
  // Usado para aplicar a animação de saída antes de remover o card do DOM.
  const [deletingCardId, setDeletingCardId] = useState(null);

  // -------------------------------------------------------------------
  // Efeitos Colaterais (Hook useEffect)
  // -------------------------------------------------------------------

  // 'useEffect' é executado após cada renderização do componente.
  // O segundo argumento, '[darkMode]', é um "array de dependências".
  // Isso significa que o código dentro do 'useEffect' só será executado
  // novamente se o valor de 'darkMode' mudar.
  useEffect(() => {
    // Acessa o elemento <body> do documento HTML.
    // Altera a classe CSS do <body> para 'dark-mode' se 'darkMode' for true,
    // ou para 'light-mode' se 'darkMode' for false.
    // Isso permite aplicar estilos globais (por exemplo, cor de fundo de toda a página)
    // com base no tema atual usando CSS.
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]); // O efeito é re-executado apenas quando 'darkMode' muda.

  // -------------------------------------------------------------------
  // Funções de Manipulação de Eventos
  // -------------------------------------------------------------------

  // Função para alternar o estado do modo escuro.
  const toggleDarkMode = () => {
    // 'setDarkMode' é chamada com uma função de callback que recebe o 'prevMode'
    // (o valor anterior de 'darkMode').
    // Isso garante que estamos sempre trabalhando com o valor mais recente do estado,
    // o que é uma boa prática ao atualizar o estado com base em seu valor anterior.
    // '!prevMode' simplesmente inverte o valor: se era true, vira false; se era false, vira true.
    setDarkMode(prevMode => !prevMode);
  };

  // Função chamada quando o arrasto de um card (iniciado em <Card>) começa.
  // 'e' é o objeto do evento de arrasto (DragEvent).
  // 'cardId' é o ID do card que começou a ser arrastado.
  const handleDragStart = (e, cardId) => {
    // Armazena o ID do card que está sendo arrastado no estado.
    setDraggingCardId(cardId);
    // 'e.dataTransfer.setData()' é uma parte crucial da API de Drag and Drop do navegador.
    // Ela armazena dados que podem ser recuperados quando o item é solto.
    // Aqui, estamos armazenando o 'cardId' com a chave 'cardId'.
    e.dataTransfer.setData('cardId', cardId);
    // Adiciona a classe CSS 'dragging' ao elemento HTML que está sendo arrastado.
    // Isso aplica os estilos definidos em App.css (opacidade, borda tracejada)
    // para dar feedback visual ao usuário.
    e.currentTarget.classList.add('dragging');
  };

  // Função chamada quando um card é solto em um componente 'Conteiner'.
  // 'e' é o objeto do evento de soltar (DragEvent).
  // 'targetColumn' é o título da coluna onde o card foi solto.
  const handleDrop = (e, targetColumn) => {
    // 'e.preventDefault()' é essencial para permitir que o evento 'drop' ocorra.
    // Por padrão, navegadores não permitem o drop em muitos elementos.
    e.preventDefault();
    // Recupera o 'cardId' que foi armazenado durante o 'dragstart'.
    const cardId = e.dataTransfer.getData('cardId');
    // Encontra o objeto do card completo no array 'cards' usando o 'cardId'.
    const draggedCard = cards.find(card => card.id === cardId);

    // Verifica se o card arrastado existe e se ele está sendo movido para uma coluna diferente.
    if (draggedCard && draggedCard.column !== targetColumn) {
      // Atualiza o estado 'cards'.
      // 'setCards' recebe uma função de callback para garantir que estamos
      // atualizando o estado com base no seu valor mais recente ('prevCards').
      setCards(prevCards =>
        // 'map' percorre cada card no array 'prevCards'.
        prevCards.map(card =>
          // Se o 'id' do card atual for igual ao 'cardId' que foi arrastado,
          // criamos um NOVO objeto de card (usando o operador spread '...')
          // e atualizamos sua propriedade 'column' para a 'targetColumn'.
          // Se não for o card arrastado, retornamos o card original sem modificações.
          card.id === cardId ? { ...card, column: targetColumn } : card
        )
      );
    }
    // Remove a classe 'dragging' do elemento que estava sendo arrastado.
    // Isso reseta os estilos visuais.
    e.target.classList.remove('dragging');
    // Reseta o estado 'draggingCardId' para null, indicando que nenhum card está mais sendo arrastado.
    setDraggingCardId(null);
  };

  // Função para reordenar cards dentro da mesma coluna.
  // 'draggedCardId': ID do card que está sendo arrastado.
  // 'targetCardId': ID do card sobre o qual o card arrastado está passando.
  // 'column': A coluna em que a reordenação está ocorrendo.
  const handleCardReorder = (draggedCardId, targetCardId, column) => {
    // Encontra o card que está sendo arrastado.
    const draggedCard = cards.find(card => card.id === draggedCardId);
    // Encontra o card que é o alvo da reordenação.
    const targetCard = cards.find(card => card.id === targetCardId);

    // Se ambos os cards existirem e estiverem na mesma coluna, procede com a reordenação.
    if (draggedCard && targetCard && draggedCard.column === column && targetCard.column === column) {
      // Cria uma nova lista de cards, excluindo o card arrastado.
      const updatedCards = cards.filter(card => card.id !== draggedCardId);
      // Encontra o índice do card alvo na lista atualizada.
      const targetIndex = updatedCards.findIndex(card => card.id === targetCardId);

      // Insere o card arrastado na posição do card alvo.
      updatedCards.splice(targetIndex, 0, draggedCard);

      // Atualiza o estado dos cards com a nova ordem.
      setCards(updatedCards);
    }
  };

  // Função para adicionar uma nova tarefa.
  // 'newTask': Objeto contendo o título e a descrição da nova tarefa.
  const handleAddTask = (newTask) => {
    // Gera um ID único para a nova tarefa.
    const newCard = {
      id: `card-${Date.now()}`, // ID único baseado no timestamp.
      titulo: newTask.title,
      descricao: newTask.description,
      column: 'Pendente', // Novas tarefas começam na coluna 'Pendente'.
      // Adiciona uma classe para a animação de entrada (aparecimento).
      className: 'card-enter',
    };
    // Atualiza o estado 'cards' adicionando a nova tarefa ao final.
    setCards(prevCards => [...prevCards, newCard]);

    // Remove a classe de animação de entrada após um curto período
    // para que a animação possa ser reativada se o card for adicionado novamente.
    setTimeout(() => {
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === newCard.id ? { ...card, className: '' } : card
        )
      );
    }, 300); // Duração da animação de entrada em App.css
  };

  // Função para excluir uma tarefa.
  // 'cardId': ID do card a ser excluído.
  const handleDeleteTask = (cardId) => {
    // Define o ID do card que está sendo excluído para ativar a animação de saída.
    setDeletingCardId(cardId);

    // Aguarda a duração da animação de saída antes de remover o card do estado.
    setTimeout(() => {
      setCards(prevCards => prevCards.filter(card => card.id !== cardId));
      // Limpa o ID do card em exclusão.
      setDeletingCardId(null);
    }, 300); // Duração da animação de saída em App.css
  };

  // -------------------------------------------------------------------
  // Renderização do Componente (JSX)
  // -------------------------------------------------------------------
  return (
    // O div principal que envolve toda a aplicação.
    // Adiciona estilos inline para flexbox, centralizando o conteúdo.
    <div style={{
      display: 'flex',
      flexDirection: 'column', // Organiza os itens em coluna (topo para baixo).
      alignItems: 'center',    // Centraliza os itens horizontalmente.
      padding: '20px',         // Adiciona preenchimento ao redor do conteúdo.
      minHeight: '100vh',      // Garante que o container ocupe a altura total da viewport.
      boxSizing: 'border-box', // Inclui padding e border no cálculo da largura/altura.
    }}>
      {/* Botão para alternar o modo escuro/claro */}
      <button
        onClick={toggleDarkMode}
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: darkMode ? '#61dafb' : '#282c34', // Cores baseadas no tema.
          color: darkMode ? '#282c34' : '#61dafb',
          cursor: 'pointer',
          marginBottom: '20px',
          fontSize: '16px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        {darkMode ? 'Modo Claro' : 'Modo Escuro'}
      </button>

      {/* Componente para criar novas tarefas */}
      <TaskForm
        darkMode={darkMode}
        onAddTask={handleAddTask}
      />

      {/* Container para as colunas do Kanban */}
      <div style={{
        display: 'flex',
        gap: '20px', // Espaçamento entre as colunas.
        flexWrap: 'wrap', // Permite que as colunas quebrem para a próxima linha em telas menores.
        justifyContent: 'center', // Centraliza as colunas horizontalmente.
        width: '100%', // Ocupa 100% da largura disponível.
        maxWidth: '1200px', // Limita a largura máxima para melhor visualização em telas grandes.
      }}>
        {/* Componente Conteiner para a coluna "Concluída" */}
        <Conteiner
          titulo="Concluída"
          backgroundColor={darkMode ? "#4CAF50" : "lightgreen"}
          darkMode={darkMode}
          onDrop={handleDrop}
          draggingCardId={draggingCardId}
          onCardReorder={handleCardReorder}
        >
          {/* Filtra e renderiza os cards que pertencem à coluna "Concluída" */}
          {cards
            .filter(card => card.column === 'Concluída')
            .map(card => (
              <Card
                key={card.id}
                card={card}
                darkMode={darkMode}
                onDragStart={handleDragStart}
                isDragging={draggingCardId === card.id}
                onDeleteTask={handleDeleteTask} // Passa a função de exclusão para o Card
                // Adiciona a classe 'card-exit' se o card estiver sendo excluído
                className={deletingCardId === card.id ? 'card-exit' : card.className}
              />
            ))}
        </Conteiner>

        {/* Componente Conteiner para a coluna "Pendente" */}
        <Conteiner
          titulo="Pendente"
          backgroundColor={darkMode ? "#FFC107" : "orange"}
          darkMode={darkMode}
          onDrop={handleDrop}
          draggingCardId={draggingCardId}
          onCardReorder={handleCardReorder}
        >
          {/* Filtra e renderiza os cards que pertencem à coluna "Pendente" */}
          {cards
            .filter(card => card.column === 'Pendente')
            .map(card => (
              <Card
                key={card.id}
                card={card}
                darkMode={darkMode}
                onDragStart={handleDragStart}
                isDragging={draggingCardId === card.id}
                onDeleteTask={handleDeleteTask} // Passa a função de exclusão para o Card
                // Adiciona a classe 'card-exit' se o card estiver sendo excluído
                className={deletingCardId === card.id ? 'card-exit' : card.className}
              />
            ))}
        </Conteiner>

        {/* Componente Conteiner para a coluna "Não-concluída" (funciona da mesma forma que "Concluída") */}
        <Conteiner
          titulo="Não-concluída"
          backgroundColor={darkMode ? "#F44336" : "red"}
          darkMode={darkMode}
          onDrop={handleDrop}
          draggingCardId={draggingCardId}
          onCardReorder={handleCardReorder}
        >
          {/* Filtra e renderiza os cards que pertencem à coluna "Não-concluída" */}
          {cards
            .filter(card => card.column === 'Não-concluída')
            .map(card => (
              <Card
                key={card.id}
                card={card}
                darkMode={darkMode}
                onDragStart={handleDragStart}
                isDragging={draggingCardId === card.id}
                onDeleteTask={handleDeleteTask} // Passa a função de exclusão para o Card
                // Adiciona a classe 'card-exit' se o card estiver sendo excluído
                className={deletingCardId === card.id ? 'card-exit' : card.className}
              />
            ))}
        </Conteiner>
      </div>
    </div>
  );
}

// Exporta o componente 'App' para que ele possa ser usado em outros arquivos (como index.jsx).
export default App;

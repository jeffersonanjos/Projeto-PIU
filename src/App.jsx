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
          // Se não for o card arrastado, retornamos o card original sem alterações.
          // Isso garante que o React detecte a mudança e re-renderize apenas o necessário.
          card.id === cardId ? { ...card, column: targetColumn } : card
        )
      );
    }
    // Reseta o 'draggingCardId' para 'null' porque o arrasto terminou.
    setDraggingCardId(null);
    // Remove a classe 'dragging' do elemento que foi arrastado,
    // restaurando sua aparência normal.
    e.currentTarget.classList.remove('dragging');
  };

  // Função para reordenar cards dentro da mesma coluna ou ao mover entre colunas.
  // 'draggedCardId': ID do card que está sendo arrastado.
  // 'targetCardId': ID do card sobre o qual o card arrastado está passando.
  // 'targetColumn': Título da coluna onde a reordenação está ocorrendo.
  const handleCardReorder = (draggedCardId, targetCardId, targetColumn) => {
    // Atualiza o estado 'cards' de forma imutável.
    setCards(prevCards => {
      // Cria uma cópia do array 'prevCards' para não modificar o estado diretamente.
      const newCards = [...prevCards];
      // Encontra o índice (posição) do card arrastado no array.
      const draggedIndex = newCards.findIndex(card => card.id === draggedCardId);
      // Encontra o índice (posição) do card alvo no array.
      const targetIndex = newCards.findIndex(card => card.id === targetCardId);

      // Se um dos cards não for encontrado (por algum motivo inesperado),
      // retorna o array original sem alterações.
      if (draggedIndex === -1 || targetIndex === -1) return prevCards;

      // Armazena os objetos dos cards arrastado e alvo.
      const draggedCard = newCards[draggedIndex];
      const targetCard = newCards[targetIndex];

      // Lógica para reordenação:
      // Se o card arrastado e o card alvo estão na mesma coluna:
      if (draggedCard.column === targetCard.column) {
        // 'splice(start, deleteCount)' remove elementos de um array.
        // Remove o card arrastado de sua posição original.
        newCards.splice(draggedIndex, 1);
        // 'splice(start, deleteCount, item1, item2, ...)' também pode inserir elementos.
        // Insere o card arrastado na nova posição.
        // A lógica 'targetIndex > draggedIndex ? targetIndex - 1 : targetIndex'
        // ajusta o índice de inserção para garantir que o card seja colocado
        // corretamente, mesmo que o índice do alvo mude após a remoção.
        newCards.splice(targetIndex > draggedIndex ? targetIndex - 1 : targetIndex, 0, draggedCard);
      } else {
        // Se estão em colunas diferentes:
        // Primeiro, atualiza a propriedade 'column' do card arrastado para a nova coluna.
        draggedCard.column = targetColumn;
        // Remove o card arrastado de sua coluna antiga.
        newCards.splice(draggedIndex, 1);
        // Filtra os cards da nova coluna e encontra o índice do card alvo dentro dela.
        const newTargetIndex = newCards.filter(card => card.column === targetColumn).findIndex(card => card.id === targetCardId);
        if (newTargetIndex !== -1) {
          // Se o card alvo foi encontrado na nova coluna, insere o card arrastado
          // antes dele.
          newCards.splice(newTargetIndex, 0, draggedCard);
        } else {
          // Se não encontrou o card alvo na nova coluna (por exemplo, a coluna estava vazia
          // e o card foi solto nela), adiciona o card arrastado ao final da nova coluna.
          newCards.push(draggedCard);
        }
      }
      // Retorna o array de cards atualizado.
      return newCards;
    });
  };

  // -------------------------------------------------------------------
  // Renderização do Componente (JSX)
  // -------------------------------------------------------------------

  // O 'return' de um componente React define o que será renderizado na tela.
  return (
    // O elemento <div> mais externo que contém toda a estrutura do aplicativo.
    // Os estilos são aplicados diretamente usando um objeto JavaScript (estilos inline).
    <div
      style={{
        display: "flex", // Usa Flexbox para organizar os contêineres horizontalmente.
        height: "100vh", // Ocupa 100% da altura da viewport (tela visível).
        width: "100vw",  // Ocupa 100% da largura da viewport.
        margin: 0,       // Remove margens padrão.
        padding: "16px", // Adiciona preenchimento interno de 16 pixels.
        // Define a cor de fundo do aplicativo, mudando com base no 'darkMode'.
        background: darkMode ? "#333" : "#eaeaea",
        gap: "16px",     // Espaçamento de 16 pixels entre os itens flex (contêineres).
        boxSizing: "border-box", // Garante que padding e border sejam incluídos na largura/altura total.
        transition: "background 0.3s ease", // Transição suave para a mudança de fundo.
      }}
    >
      {/* Botão para alternar o modo claro/escuro */}
      <button
        onClick={toggleDarkMode} // Quando clicado, chama a função 'toggleDarkMode'.
        style={{
          position: "absolute", // Posiciona o botão de forma absoluta em relação ao seu pai mais próximo com posição não estática.
          top: "10px",      // 10 pixels do topo.
          right: "10px",    // 10 pixels da direita.
          padding: "10px 20px", // Preenchimento interno do botão.
          // Cor de fundo do botão, muda com o 'darkMode'.
          backgroundColor: darkMode ? "#555" : "#ddd",
          // Cor do texto do botão, muda com o 'darkMode'.
          color: darkMode ? "#fff" : "#333",
          border: "none",   // Remove a borda padrão do botão.
          borderRadius: "5px", // Cantos arredondados.
          cursor: "pointer", // O cursor vira uma "mãozinha" ao passar por cima.
          zIndex: 1000,      // Garante que o botão fique acima de outros elementos.
        }}
      >
        {/* Texto do botão, muda para "Claro" ou "Escuro" dependendo do modo atual. */}
        Alternar Modo {darkMode ? "Claro" : "Escuro"}
      </button>

      {/*
        Componente Conteiner para a coluna "Concluída".
        - 'titulo': O título exibido no cabeçalho da coluna.
        - 'backgroundColor': A cor de fundo da área de conteúdo da coluna,
          mudando com base no 'darkMode'.
        - 'darkMode': Passa o estado atual do modo escuro para o Conteiner.
        - 'onDrop': Passa a função 'handleDrop' para que o Conteiner possa
          lidar com cards soltos nele.
        - 'draggingCardId': Passa o ID do card que está sendo arrastado,
          útil para feedback visual.
        - 'onCardReorder': Passa a função 'handleCardReorder' para que o Conteiner
          possa solicitar a reordenação de cards.
      */}
      <Conteiner
        titulo="Concluída"
        backgroundColor={darkMode ? "#4CAF50" : "green"}
        darkMode={darkMode}
        onDrop={handleDrop}
        draggingCardId={draggingCardId}
        onCardReorder={handleCardReorder}
      >
        {/*
          Filtra os cards que pertencem à coluna "Concluída" e os mapeia para
          componentes <Card>.
          - 'filter': Cria um novo array contendo apenas os cards cuja 'column'
            corresponde ao título desta coluna.
          - 'map': Para cada card filtrado, renderiza um componente <Card>.
            - 'key={card.id}': Uma 'key' única é ESSENCIAL para listas em React.
              Ajuda o React a identificar quais itens mudaram, foram adicionados
              ou removidos, otimizando a renderização.
            - 'card={card}': Passa o objeto completo do card como uma prop 'card'.
            - 'darkMode={darkMode}': Passa o estado do modo escuro para o Card.
            - 'onDragStart={handleDragStart}': Passa a função para iniciar o arrasto.
            - 'isDragging={draggingCardId === card.id}': Informa ao Card se ele
              mesmo está sendo arrastado no momento.
        */}
        {cards
          .filter(card => card.column === 'Concluída')
          .map(card => (
            <Card
              key={card.id}
              card={card}
              darkMode={darkMode}
              onDragStart={handleDragStart}
              isDragging={draggingCardId === card.id}
            />
          ))}
      </Conteiner>

      {/* Componente Conteiner para a coluna "Pendente" (funciona da mesma forma que "Concluída") */}
      <Conteiner
        titulo="Pendente"
        backgroundColor={darkMode ? "#FFC107" : "orange"}
        darkMode={darkMode}
        onDrop={handleDrop}
        draggingCardId={draggingCardId}
        onCardReorder={handleCardReorder}
      >
        {cards
          .filter(card => card.column === 'Pendente')
          .map(card => (
            <Card
              key={card.id}
              card={card}
              darkMode={darkMode}
              onDragStart={handleDragStart}
              isDragging={draggingCardId === card.id}
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
        {cards
          .filter(card => card.column === 'Não-concluída')
          .map(card => (
            <Card
              key={card.id}
              card={card}
              darkMode={darkMode}
              onDragStart={handleDragStart}
              isDragging={draggingCardId === card.id}
            />
          ))}
      </Conteiner>
    </div>
  );
}

// Exporta o componente 'App' para que ele possa ser usado em outros arquivos,
// como o 'main.jsx' (ou 'index.jsx') que renderiza o aplicativo na página HTML.
export default App;

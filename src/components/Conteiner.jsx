// Importa a biblioteca React.
// 'React.Children' e 'React.isValidElement' são utilitários para trabalhar com as 'children' (filhos)
// passadas para um componente.
// 'React.cloneElement' é usado para adicionar ou sobrescrever props em elementos filhos.
import React from 'react';
// Importa o componente Card, necessário para verificar se um filho é um Card.
import Card from './Card';

// Define o componente funcional 'Conteiner'.
// Ele recebe um objeto 'props' (propriedades) que são dados passados do componente pai (App.jsx).
const Conteiner = (props) => {
  // Desestrutura as propriedades para facilitar o uso.
  // 'titulo': O texto do cabeçalho da coluna (ex: "Concluída").
  // 'backgroundColor': A cor de fundo da área de conteúdo da coluna.
  // 'children': Os elementos React (nossos Cards) que são renderizados dentro deste Conteiner.
  // 'darkMode': Um booleano que indica se o modo escuro está ativado.
  // 'onDrop': Uma função passada do App.jsx para lidar com o soltar de um card nesta coluna.
  // 'onCardReorder': Uma função passada do App.jsx para lidar com a reordenação de cards.
  // 'draggingCardId': O ID do card que está sendo arrastado no momento.
  const { titulo, backgroundColor, children, darkMode, onDrop, onCardReorder, draggingCardId } = props;

  // -------------------------------------------------------------------
  // Funções de Manipulação de Eventos de Drag and Drop
  // -------------------------------------------------------------------

  // Função para lidar com o evento 'dragOver' (quando um card arrastado passa por cima)
  // de um card *dentro* deste contêiner.
  // 'e' é o objeto do evento de arrasto (DragEvent).
  // 'targetCardId' é o ID do card sobre o qual o card arrastado está passando.
  const handleDragOverCard = (e, targetCardId) => {
    // 'e.preventDefault()' é crucial. Por padrão, navegadores não permitem
    // o drop em muitos elementos. Chamar 'preventDefault' no 'dragOver'
    // indica que o elemento é um alvo válido para drop.
    e.preventDefault();
    // Recupera o ID do card que está sendo arrastado, que foi armazenado
    // no 'dataTransfer' durante o 'dragStart' no Card.jsx.
    const draggedCardId = e.dataTransfer.getData('cardId');

    // Verifica se há um card sendo arrastado e se ele não é o próprio card alvo.
    // Evita que um card seja reordenado consigo mesmo.
    if (draggedCardId && draggedCardId !== targetCardId) {
      // Chama a função 'onCardReorder' que foi passada do App.jsx.
      // Isso informa ao componente pai que um card precisa ser reordenado
      // em relação a 'targetCardId' dentro desta 'titulo' de coluna.
      onCardReorder(draggedCardId, targetCardId, titulo);
    }
  };

  // Função para lidar com o evento 'drop' (quando um card é solto)
  // diretamente no espaço *vazio* do contêiner (não sobre outro card).
  // 'e' é o objeto do evento de soltar (DragEvent).
  const handleDropOnContainer = (e) => {
    // Novamente, 'e.preventDefault()' é necessário para permitir o drop.
    e.preventDefault();
    // Chama a função 'onDrop' que foi passada do App.jsx,
    // informando que um card foi solto nesta 'titulo' de coluna.
    onDrop(e, titulo);
  };

  // -------------------------------------------------------------------
  // Renderização do Componente (JSX)
  // -------------------------------------------------------------------

  return (
    // O elemento <div> que representa uma única coluna do quadro Kanban.
    // Ele é um alvo para arrastar e soltar.
    <div
      // 'onDragOver': Evento disparado quando um elemento arrastável passa sobre este <div>.
      // 'e.preventDefault()' é chamado para permitir o drop.
      onDragOver={(e) => e.preventDefault()}
      // 'onDrop': Evento disparado quando um elemento arrastável é solto sobre este <div>.
      // Chama 'handleDropOnContainer' para processar o drop.
      onDrop={handleDropOnContainer}
      style={{
        display: "flex", // Usa Flexbox para organizar os itens (Cards) verticalmente.
        flexDirection: "column", // Os itens flex (Cards) serão empilhados em uma coluna.
        height: "100%",  // Ocupa 100% da altura disponível em seu pai (App.jsx).
        width: "100%",   // Ocupa 100% da largura disponível em seu pai.
        flex: 1,         // Permite que esta coluna cresça e ocupe o espaço disponível
                         // igualmente entre as outras colunas flex.
        borderRadius: "12px", // Cantos arredondados para a coluna.
        overflow: "hidden",   // Garante que o conteúdo que exceda os limites seja cortado.
        // Aplica uma sombra ao redor da coluna.
        // A sombra muda com base no 'darkMode' para ter um visual mais natural e "Google".
        boxShadow: darkMode ? "0 8px 20px rgba(0, 0, 0, 0.4)" : "0 4px 10px rgba(0,0,0,0.1)",
        // Cor de fundo da coluna, muda com base no 'darkMode'.
        background: darkMode ? "#555" : "#fff",
        margin: "8px",   // Margem externa para espaçar as colunas.
        // Transições suaves para as mudanças de fundo e sombra.
        transition: "background 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Cabeçalho da coluna */}
      <h1
        style={{
          textAlign: "center", // Centraliza o texto do título.
          margin: 0,           // Remove margens padrão do h1.
          padding: "16px",     // Preenchimento interno.
          // Cor de fundo do cabeçalho, muda com o 'darkMode'.
          background: darkMode ? "#444" : "#f0f0f0",
          // Cor do texto do cabeçalho, muda com o 'darkMode'.
          color: darkMode ? "#fff" : "#333",
          fontSize: "18px",    // Tamanho da fonte.
          // Borda inferior do cabeçalho, muda com o 'darkMode'.
          borderBottom: darkMode ? "1px solid #666" : "1px solid #ddd",
          // Transições suaves para as mudanças de fundo, cor e borda.
          transition: "background 0.3s ease, color 0.3s ease, border-bottom 0.3s ease",
        }}
      >
        {/* Exibe o título da coluna, passado via props. */}
        {titulo}
      </h1>
      {/* Área de conteúdo onde os cards serão renderizados */}
      <div
        style={{
          // Usa a cor de fundo passada via props, que já é condicional ao 'darkMode' no App.jsx.
          backgroundColor: backgroundColor,
          flex: 1,         // Permite que esta área preencha o espaço restante verticalmente.
          padding: "20px", // Preenchimento interno para os cards.
          borderRadius: "0 0 12px 12px", // Arredonda apenas os cantos inferiores.
        }}
      >
        {/*
          'React.Children.map' é uma forma segura de iterar sobre os 'children'
          (elementos filhos) passados para este componente.
          Isso é útil porque 'children' pode ser um único elemento, um array de elementos,
          ou até mesmo nulo.
        */}
        {React.Children.map(children, child => {
          // Verifica se o 'child' atual é um elemento React válido e se é um componente 'Card'.
          // Isso é importante para garantir que estamos manipulando apenas os Cards.
          if (React.isValidElement(child) && child.type === Card) {
            // 'React.cloneElement' cria um novo elemento React baseado em 'child',
            // mas permite adicionar ou sobrescrever props.
            return React.cloneElement(child, {
              // Adiciona a função 'onDragOver' ao Card.
              // Quando um card arrastado passa sobre este Card, 'handleDragOverCard' é chamada.
              // Passamos o evento 'e' e o ID do card alvo (child.props.card.id).
              onDragOver: (e) => handleDragOverCard(e, child.props.card.id),
              // Adiciona uma classe CSS condicionalmente para feedback visual.
              // Se um card estiver sendo arrastado E não for o próprio card alvo,
              // aplica a classe 'drag-over-target' (definida em App.css).
              className: draggingCardId && draggingCardId !== child.props.card.id ? 'drag-over-target' : ''
            });
          }
          // Se o filho não for um Card ou não for um elemento válido, retorna-o como está.
          return child;
        })}
      </div>
    </div>
  );
};

// Exporta o componente 'Conteiner' para que ele possa ser importado e usado em outros arquivos.
export default Conteiner;

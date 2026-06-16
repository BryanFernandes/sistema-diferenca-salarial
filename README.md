# 💰 Sistema de Diferença Salarial

Sistema web desenvolvido para automatizar o cálculo de diferenças salariais decorrentes de reajustes sindicais (dissídios), reduzindo erros manuais e agilizando a geração de relatórios.

## 🚀 Demonstração

🔗 **Acesse o projeto:**
https://bryanfernandes.github.io/sistema-diferenca-salarial

---

## 📖 Sobre o Projeto

Este projeto foi desenvolvido para solucionar um problema real encontrado em cálculos trabalhistas.

Em determinadas situações, colaboradores permanecem recebendo salários abaixo do piso salarial da categoria profissional. Com o passar dos anos, novos dissídios são aplicados pelo sindicato, aumentando o piso salarial, enquanto o salário efetivamente pago ao trabalhador continua sem os reajustes devidos.

Quando ocorre o desligamento do colaborador, torna-se necessário calcular todas as diferenças salariais acumuladas durante o período trabalhado.

Esse processo costuma exigir muitos cálculos repetitivos, análise de datas e conferência de valores, tornando-se demorado e sujeito a erros quando realizado manualmente.

O Sistema de Diferença Salarial foi criado para automatizar esse trabalho, permitindo calcular rapidamente os valores devidos e gerar relatórios organizados.

---

## 🎯 Problema Resolvido

O sistema permite calcular diferenças salariais acumuladas considerando:

* Data de admissão;
* Data de desligamento;
* Salário recebido pelo colaborador;
* Reajustes salariais (dissídios);
* Períodos em que o salário permaneceu abaixo do valor correto.

Além disso, o sistema também pode ser utilizado para:

* Simulações de reajustes salariais;
* Conferência de cálculos trabalhistas;
* Estudos de impacto de dissídios;
* Validação de diferenças salariais em cenários hipotéticos.

---

## ✨ Funcionalidades

* ✅ Cadastro de dados do colaborador
* ✅ Registro de reajustes salariais
* ✅ Cálculo automático das diferenças salariais
* ✅ Geração de relatório detalhado
* ✅ Histórico de relatórios salvos
* ✅ Reabertura de relatórios anteriores
* ✅ Armazenamento local utilizando Local Storage
* ✅ Interface responsiva

---

## 🛠️ Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (ES6+)
* Local Storage

---

## 📋 Como Utilizar

### 1️⃣ Informar os dados iniciais

Preencha:

* Nome do colaborador
* Data de admissão
* Data de desligamento
* Salário base

### 2️⃣ Adicionar os reajustes

Cadastre cada reajuste salarial informando:

* Data do reajuste
* Novo valor salarial

### 3️⃣ Gerar o relatório

O sistema calculará automaticamente:

* Diferenças mensais
* Períodos impactados
* Valor total acumulado

### 4️⃣ Salvar o relatório

Os relatórios podem ser armazenados localmente para consultas futuras.

---

## 📊 Exemplo de Utilização

Imagine um colaborador que:

* Foi admitido em janeiro de 2020;
* Recebia R$ 1.500,00;
* Teve o piso salarial reajustado para R$ 1.700,00 em maio de 2021;
* Só passou a receber o valor correto em dezembro de 2021.

Nesse cenário, o sistema calcula automaticamente todas as diferenças acumuladas entre maio e dezembro de 2021, além de considerar reajustes posteriores cadastrados.

---

## 🔄 Fluxo do Sistema

```text
Preenchimento dos dados
          ↓
Cadastro dos reajustes
          ↓
Geração do relatório
          ↓
Cálculo das diferenças
          ↓
Exibição dos resultados
          ↓
Salvamento do relatório
          ↓
Consulta pelo histórico
```

## 📚 Aprendizados

Durante o desenvolvimento deste projeto foram praticados conceitos como:

* Manipulação avançada do DOM
* Estruturas de dados com Arrays e Objetos
* Persistência de dados utilizando Local Storage
* Organização de lógica de negócio
* Manipulação de datas
* Formatação de valores monetários
* Criação dinâmica de elementos HTML
* Tratamento de eventos

---

## 🔮 Próximos Passos

* [ ] Integração com banco de dados
* [ ] Desenvolvimento de API própria
* [ ] Sistema de autenticação
* [ ] Controle de usuários
* [ ] Refatoração e modularização do código
* [ ] Testes automatizados

---

## 👨‍💻 Autor

**Bryan Fernandes**

🌐 Portfólio: https://bryanfernandes.github.io

---

## ⭐ Objetivo do Projeto

Além de solucionar um problema real de cálculo trabalhista, este projeto faz parte da minha jornada de aprendizado em desenvolvimento web, servindo como laboratório para aplicação prática de conceitos de lógica de programação, JavaScript, armazenamento de dados e futuramente integração com banco de dados e back-end.



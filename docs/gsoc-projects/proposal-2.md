---
title: "RAG for Natural Language Queries over Gold Data"
order: 2
size: "Large (350 hours)"
difficulty: "Difficult"
subtitle: "Transforming complex governmental data into clear answers through natural language."
external_link: "https://gov-hub.io/"
external_label: "Visit GovHub"
outcomes:
  - "RAG pipeline capable of interpreting questions and generating SQL queries."
  - "Safeguards to avoid hallucinations and ensure traceability of answers."
  - "Documentation and examples of typical analyses with natural language."
required_skills:
  - "Languages: Python, SQL"
  - "Knowledge: LLMs, RAG architectures, data modeling"
  - "Tools: Vector databases, PostgreSQL, popular LLM APIs"
nice_to_have:
  - "Experience with LangChain or similar frameworks."
  - "Knowledge of data governance and security for public data."
mentors:
  - "Mateus de Castro (@mat054)"
  - "Davi de Aguiar (@davi-aguiar-vieira)"
description: >
  This project aims to develop a system based on Retrieval-Augmented Generation (RAG) that enables natural language
  queries to be executed directly over qualified GovHub data. The goal is to transform complex governmental datasets
  into precise, auditable answers, rather than a generic chatbot that hallucinates responses.

  The system should leverage metadata, table descriptions and vectorized schemas to feed the LLM, automatically
  generate SQL queries, manage them, and return structured results that can be validated and reused. Special attention
  must be given to traceability and robustness of the generated queries, as well as clear reporting of limitations and
  uncertainty where needed.
---

This project aims to develop a system based on Retrieval-Augmented Generation (RAG) that enables natural language queries to be executed directly over qualified GovHub data. The goal is to transform complex governmental datasets into precise, auditable answers, rather than a generic chatbot that hallucinates responses.

The system should leverage metadata, table descriptions and vectorized schemas to feed the LLM, automatically generate SQL queries, manage them, and return structured results that can be validated and reused. Special attention must be given to traceability and robustness of the generated queries, as well as clear reporting of limitations and uncertainty where needed.


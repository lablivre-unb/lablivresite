---
title: "Pipeline for Data Quality Verification and Anomaly Detection in Governmental Data with Automated Reports"
order: 1
size: "Medium (175 hours)"
difficulty: "Medium"
external_link: "https://gov-hub.io/"
external_label: "Visit GovHub"
outcomes:
  - "Data quality verification module integrated into the GovHub ingestion pipeline."
  - "Automatic weekly or monthly reports with anomalies and quality indicators."
  - "Technical documentation and examples for running and extending the module."
required_skills:
  - "Languages: Python, SQL"
  - "Knowledge: Basic statistics, exploratory data analysis, data engineering"
  - "Tools: Pandas, PostgreSQL (or equivalent)"
nice_to_have:
  - "Experience with dbt and Airflow."
  - "Docker and container-based development."
  - "Observability (logs, metrics, alerts) for data pipelines."
mentors:
  - "Mateus de Castro (@mat054)"
  - "Davi de Aguiar (@davi-aguiar-vieira)"
description: >
  Currently, GovHub performs daily ingestions of data from various public sources, organizing it into data layers
  (bronze, silver, and gold). Although there are some point validations, the systematic identification of anomalies,
  inconsistencies, and data quality issues still depends on manual inspections or ad hoc checks.

  The objective of this project is to build an automated data quality verification module for the databases of the core government systems
  (ComprasNet, SIAFI, TransfereGov, SIAPE, and SIORG), capable of analyzing daily ingestions and generating consolidated periodic reports
  (weekly or monthly) highlighting statistical anomalies, semantic inconsistencies, and potential structural issues. The focus is not on
  automatically correcting the data, but on providing visibility, traceability, and issue prioritization for pipeline maintainers.

  As the desired final state, the student should deliver a system integrated into the existing GovHub pipeline that applies automated
  (statistical and semantic) checks on processed tables and produces structured, versioned, and auditable reports, facilitating data
  governance and the reliability of published data.
---

Currently, GovHub performs daily ingestions of data from various public sources, organizing it into data layers (bronze, silver, and gold). Although there are some point validations, the systematic identification of anomalies, inconsistencies, and data quality issues still depends on manual inspections or ad hoc checks.

The objective of this project is to build an automated data quality verification module for the databases of the core government systems (ComprasNet, SIAFI, TransfereGov, SIAPE, and SIORG), capable of analyzing daily ingestions and generating consolidated periodic reports (weekly or monthly) highlighting statistical anomalies, semantic inconsistencies, and potential structural issues. The focus is not on automatically correcting the data, but on providing visibility, traceability, and issue prioritization for pipeline maintainers.

As the desired final state, the student should deliver a system integrated into the existing GovHub pipeline that applies automated (statistical and semantic) checks on processed tables and produces structured, versioned, and auditable reports, facilitating data governance and the reliability of published data.


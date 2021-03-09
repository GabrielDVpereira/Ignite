import React from "react";
import { RepositoryItem } from "./RepositoryItem";
import "../styles/repositories.scss";
import { useState, useEffect } from "react";
import axios from "axios";

type Repository = {
  name: string;
  description: string;
  html_url: string;
};

export function RespositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    axios
      .get("https://api.github.com/orgs/rocketseat/repos")
      .then(({ data }) => setRepositories(data));
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>
      <ul>
        {repositories.map((repository, key) => (
          <RepositoryItem key={key} repository={repository} />
        ))}
      </ul>
    </section>
  );
}

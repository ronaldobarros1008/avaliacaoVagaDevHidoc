import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import {
  Title, Form, Repositories, Error,
} from './styles';

const Dashboard = () => {
  const [username, setUsername] = useState('');

  const [inputError, setInputError] = useState('');

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository(event) {
    event.preventDefault();

    if (!username) {
      setInputError('Digite o nome do usuário.');
      return;
    }

    try {
      const response = await api.get(`users/${username}/repos`);

      const repository = response.data;

      setRepositories(repository);

      setUsername('');
      setInputError('');
    } catch (err) {
      setInputError('Erro ao buscar esse usuário.');
    }
  }

  return (
    <>
      <Title>Repositórios</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite o nome do usuário"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;

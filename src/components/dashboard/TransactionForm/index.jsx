import { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--accent);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: var(--bg-primary);
  color: var(--text-primary);
`;

const Button = styled.button`
  padding: 0.75rem;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    opacity: 0.9;
  }
`;

export function TransactionForm({ mode, onAddTransaction }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const categories = mode === 'crypto' 
    ? ['Compra', 'Venda', 'Transferência']
    : ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Outros'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    
    onAddTransaction({
      description,
      amount: parseFloat(amount),
      category: category || 'Outros',
      type: amount >= 0 ? 'income' : 'expense'
    });
    
    setDescription('');
    setAmount('');
    setCategory('');
  };

  return (
    <FormContainer>
      <Title>Registrar Transação</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Descrição</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Compra do mês"
            required
          />
        </InputGroup>
        
        <InputGroup>
          <Label>Valor (R$)</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0,00"
            step="0.01"
            required
          />
        </InputGroup>
        
        <InputGroup>
          <Label>Categoria</Label>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Selecione uma categoria</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Select>
        </InputGroup>
        
        <Button type="submit">Adicionar Transação</Button>
      </Form>
    </FormContainer>
  );
}
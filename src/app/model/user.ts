import { Profissao } from './Profissao';
import { Telefone } from './telefone';
export class User {
  //classes que vamos carregar da lista do usuário

  //! atribuição definitiva
  id!: number;
  login!: string;
  password!: string;
  email!: string;
  nome!: string;
  cpf!: string;
  dataNascimento!: string;
  salario!: DoubleRange;
  profissaoUser!: string;

  profissao: Profissao = new Profissao();

  telefones!: Array<Telefone>;

  cep!: string;
  logradouro!: string;
  bairro!: string;
  localidade!: string;
  uf!: string;
  complemento!: string;

}

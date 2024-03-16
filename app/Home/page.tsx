import NavBar from '@/components/navBar';
import { FiBriefcase, FiSettings, FiPhone } from 'react-icons/fi';

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="h-screen bg-blue-100">
        <header className="bg-blue-500 shadow-md p-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-white">Bem-vindo</h1>
          </div>
        </header>
        <section className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Nossos Serviços</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Gerenciamento de Produtos"
              description="Permite o Cadastro de novos produtos, Um BenckMarking do melhor preço em outras Lojas, e envio de Email."
              icon={<FiBriefcase className="text-3xl mb-4 text-gray-800" />}
            />
            <ServiceCard
              title="Requisição de Saida de Produtos"
              description="Permite a requisição de novos produtos para o estoque. Os produtos da requisição são de acordo com os produtos cadastrados no gerenciamento."
              icon={<FiSettings className="text-3xl mb-4 text-gray-800" />}
            />
            <ServiceCard 
              title="Registro de comparações"
              description="Oferece um registro dos logs realizados no serviço de BenchMark."
              icon={<FiSettings className="text-3xl mb-4 text-gray-800" />}
            />
          </div>
        </section>
        <section className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Entre em Contato</h2>
          <p className="text-xl text-gray-700 mb-6">
            Estamos aqui para ajudar! Entre em contato conosco para obter mais informações sobre
            nossos serviços ou para esclarecer qualquer dúvida.
          </p>
          <div className="flex justify-center">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Contato
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => (
  <div className="p-6 bg-white rounded-md shadow-md transition-transform transform hover:scale-105">
    {icon}
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

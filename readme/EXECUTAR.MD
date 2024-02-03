# Executar o Projeto

O projeto foi executado na seguinte configuração:

- Sistema Operacional Linux, na distro Ubuntu 20.04;
- Máquina Virtual com 2GB, 1 CPU, 50 GB de hard-disk;
- Linguagem de Programação TypeScript;
- Banco de Dados SQLite;
- JEST para realizar os testes.


Executar:

Provisionar máquina virtual:
```
terraform apply -auto-approve
```

Visualizar o IP provisionado:
```
terraform output
```

Enviar o arquivo o arquivo ssh da máquina local para máquina remota:
```
ssh-agent bash
ssh-agent add ~/.ssh/arquivo
scp ~/.ssh/arquivo root@ipDaMaquinaRemota:/root/.ssh/
scp ~/.ssh/arquivo.pub root@ipDaMaquinaRemota:/root/.ssh/
```

Acessar a máquina remota:
```
ssh-agent bash
ssh-agent add ~/.ssh/arquivo
ssh root@ipDaMaquinaRemota
```

Na máquina remota clonar o projeto:
```
git clone git@github.com:fabiocaettano/clean-architecture-001.git
```

Instalar as dependências:
```
cd clean-architecture-001
. install.sh
```

# Executar os testes
```
npm run test
```

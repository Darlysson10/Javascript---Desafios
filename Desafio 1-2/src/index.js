//importar todos os módulos das pastas - cada controller vai ter uma importação específica
const Agenda = require('./models/Agenda');
const CadastroDePacientes = require('./models/CadastroDePacientes');
const Consulta = require('./models/Consulta');
const Paciente = require('./models/Paciente');
const ValidacaoAgenda = require('./models/ValidacaoAgenda');
const ValidacaoCadastroPaciente = require('./models/ValidacaoCadastroPaciente');
const ValidacaoCPF = require('./models/ValidacaoCPF');
const ValidacaoDataHora = require('./models/ValidacaoDataHora');
const ValidacaoExclusaoPaciente = require('./models/ValidacaoExclusaoPaciente');
const ViewMenus = require('./views/ViewMenus');
const ViewListagem = require('./views/ViewListagem');

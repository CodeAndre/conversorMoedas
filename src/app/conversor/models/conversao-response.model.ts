export class ConversaoResponse {

    constructor (
        public base: string, //moeda 
        public date: string, //data da pesquisa
        public rate: any //retorna o que nós consultamos
    ) {}
}
# Borrador blockChain

### Introducción - conceptos generales  blockChain

> Como concepto general, una cadena de bloques o Blockchain es una base de datos descentralizada y segura que almacena la información en forma de transacciones. Estos datos son compartidos de manera pública a todos los usuarios de esta “red”.  

> Cada grupo de transacciones comunes se almacena en un bloque, y se genera una función criptográfica que garantice la seguridad del mismo y de las transacciones mediante conocida como función hash. El comentado principal del hash es enlazar el “current block” (hash) con el bloque anterior (previousHash).  


![](Borrador%20blockChain/Screenshot%202019-11-25%20at%2016.00.37.png)


> En general cada transacción almacena los datos de una operación, y suele estar formado por el hash mencionado anteriormente y otros parámetros como por ejemplo el timestamp, que es un dato único generado por la fecha y hora actual en milisegundos, el nonce que es un número aleatorio que garantice que cada hash generado no se repite y el hash del bloque previo, que normalmente es público.  


### Ledger

> Básicamente una cadena de bloques es un Ledger. Comparado las transacciones de una cadena de bloques con transacciones bancarias o físicas  estándar, un Ledger es una especie de libro contable digital, que almacena todas las transacciones firmadas por los usuarios de la red (pagos, contratos, …) de una manera inmutable.  

> Su funcionamiento base podemos asemejarlo a un libro contable  en la cual se registran todos los movimientos o transacciones de una organización. En cada uno de estos registros, cada bloque tiene un lugar único y específico dentro de la cadena ( conteniendo información única ), y a su vez la cadena completa se guarda en cada nodo de la red.  

> A medida que se crean nuevos registros, estos se validan previamente por por los nodos de la red y más tarde son añadidos como un nuevo bloque que se enlaza en la cadena. Al tratarse de una tecnología distribuida y redundante, cada nodo de la red/cadena almacena una copia exacta de la misma, lo que garantiza la disponibilidad de la información en todo momento. De esta manera se garantiza que la información almacena en la cadena no se puede perder, modificar o eliminar.  

> Es necesario para entender este concepto, revisar las características y diferencias de un sistema centralizado y uno descentralizado.  

~-. Sistema Centralizado~
		* 	Una entidad central almacena la información 
		* Todas las decisiones son tomadas por esta entidad (reglas, comisiones, …)
		* Esta unidad central almacena toda la confianza del sistema 
		
~-. Sistema Descentralizado~

		* 	Todos los nodos/miembros del sistema almacenan la información
		* Cada nodo tiene el mismo poder, y por tanto las decisiones dependen de que se alcance una mayoría entre estos nodos
		* Es un sistema más transparente y por ende más justo

Teniendo en cuenta todos estos datos, se aprecian algunas de las principales ventajas de un sistema basado en BlockChain :

	* La descentralización provoca un sistema confiable ( deberían ser atacados miles o millones de nodos para hacerse con el control de la red y/o la información )
	* La falta de intermediarios facilita las reglas, restricciones, comisiones, …
	* El reparto de responsabilidad aumenta la seguridad y hace que la información sea confiable
	* Cada operación es validada por consenso entre los miembros de la red
	* La escritura del bloque es única y no se puede alterar, cualquier modificación no valida, no sería aceptada por el resto de nodos


**~Transacciones~**

> La base de la cadena de bloques son las transacciones. Para entender mejor el concepto de transacción, supongamos que dos usuarios  **A** y **B** en una red blockchain quieren realizar una operación entre ellos. El usuario A quiere retirar por ejemplo 1 bitcoin de su cuenta para transferírselo al usuario B,  lo primero que necesita es la aprobación de la red  de manera que debe comunicárselo a cada miembro de la misma, con la particularidad de que nadie de la red sabrá quien es A ni que es B, solo saben que desde una cartera digital ( equivalente a una cuenta ), se quiere transferir una cantidad desconocida. De modo que el usuario que quiera realizar una transacción devela sus intenciones pero no su identidad, y el resto de usuarios validan la operación comprobando si tiene balance suficiente, dando por válido el procedimiento en lo que se conoce como transacción por consenso. Con el paso del tiempo, mas y mas transacciones se añaden al bloque, una vez que este se llena llega la validación definitiva, entrarías en este punto los mineros y la minería, Proof of work, … temas que trataré en otros artículos.  

![](Borrador%20blockChain/Screenshot%202019-11-25%20at%2016.00.54.png)


> Recordemos que una red blockchain es una especie de base de datos distribuida entre muchos participantes, y que la red en su libro de registro almacena todas las transacciones ejecutadas en dicha red. A cada participante se le llama nodo, y estos nodos se conectan entre ellos mediante el protocolo Peer to Peer más conocido como P2P, cumpliendo así otro de los requisitos de BlockChain que es que todos los miembros utilicen el mismo protocolo de comunicación.  


### Como crear tu propio bloque con Javascript

Una vez expuestos los principios teóricos sobre blockchain, su funcionamiento y peculiaridades, es el momento de crear el código necesario para poder añadir bloques a la cadena.

Los requisitos, y el entorno necesario para poder crear estos bloques son :
	
	* Javascript
	* yard / npm

*	(opcionales)*

	*  nodemon
	* Babel
	* jest
	* eslint

Para poder desarrollar el ejemplo es recomendable aunque no obligatorio instalar Babel y su preset de environment, habilitando así el uso de ES6 y módulos de javascript (export/import).

Se instala mediante `yarn add babel/core @babel/node @babel/prese-env —dev` (puede perfectamente utilizarse npm, npm Install …), de manera que el fichero babelrc tendrá el siguiente aspecto. 

![](Borrador%20blockChain/presets.png)

Por otro lado el fichero  packakge.json son las dependencias

![](Borrador%20blockChain/package.png)

La única dependencia de terceros que se va a utilizar es crypto.js, para poder realizar cifrado, en este caso mediante *SHA256*.


> En esta primera parte del ejemplo, lo ficheros principales son índex.js, que es el fichero de entrada de la app. En este fichero se realiza la importación de nuestra clase Block, y se genera un nuevo bloque (minado) a partir del bloque original, conocido como *bloque génesis* o *genesis Block.*  

![](Borrador%20blockChain/index.png)

Veamos ahora el código principal, la clase Block . La case Block consta de un constructor y cuatro métodos estáticos principales, génesis, mineBlock, hash y print.

~Constructor~

	Se establecen/asignan los cuatro valores que debe tener un bloque: 

		* 	 timestamp
		* hash
		* previousHash
		* data
```js
	constructor(timestamp, previousHash, hash, data) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
  }

```
	
 ~Genesis~

	Sirve para generar el bloque original, conocido en blockChain como bloque génesis. Es la primera pieza de la cadena, y desde donde colgarán el resto de elementos de la misma.

```js
  static get genesis() {
    const timestamp = new Date(2010, 0, 1).getTime();
    return new Block(timestamp, undefined, ‘g3n3sis-h4ash’, ‘default data’);
  }
```

~Mine Block~

Es el método mediante el cual se generan nuevos bloques y se añaden a la cadena, es decir se minan.

```js
 	static mineBlock(previousBlock, data) {
    const timestamp = Date.now();
    const { hash: previousHash } = previousBlock;
    const hash = this.hash(timestamp, previousHash, data);

    return new this(timestamp, previousHash, hash, data);
  }

```

~Hash~

Mediante la librería de terceros crypto.js, se cifra mediante protocolo *SHA256* cada unos de los has generados.

```js
 static hash(timestamp, previousHash, data) {
    return SHA256(`${timestamp}${previousHash}${data}`).toString();
  }

```

~Print~

Y por último el método público print, para poder ver los bloques de una manera legible en tiempo de desarrollo

```js
	print() {
    const {
      timestamp, previousHash, hash, data
    } = this;

    return  `Block -
      timestamp: ${timestamp}
      previousHash: ${previousHash}
      hash: ${hash}
      data: ${data}
    `
  }
```

El resultado final de la calse principal Block, es el siguiente:

![](Borrador%20blockChain/block.png)

### Creando la clase Blockchain

Una vez desarrollada la clase Block, es hora de crear la clase Blockchain. Esta clase tienes las siguientes características principales: 

	* Hereda de la clase Block
	* Cada instancia se genera a partir de un bloque génesis o gneis block
	* Provee un método para facilitar la creación de nuevos bloques

Como primer paso se genera un función validadora, que se encarga de comparar los “hashes” del bloque actual y del bloque anterior, para garantizar la integridad de la cadena.

![](Borrador%20blockChain/validator.png)

Con ayuda de esta función validadora, se puede en la nueva clase BlockChain, realizar las validaciones necesarias antes de añadir  un nuevo bloque a la cadena, para garantizar la integridad de la misma. A continuación la clase resultante :  


![](Borrador%20blockChain/blockChainWithValidator.png)


### Próximos pasos … y recursos interesantes

Como continuación a esta introducción a blockChain y la generación de bloques con javascript, una posibilidad es realizar una app básica que mediante una API permita crear bloques a varios usuarios de manera concurrente y compartir todas las transacciones de la cadena entre sus miembros.

También puede ser interesante una aproximación a componentes, haciendo que cada una de estas “piezas” se genere a través de un web component o similar, haciendo muy escalable el proceso, ya que sería posible integrar todas las características del bloque en cualquier app  con la mera importación del componente.

~Recursos~ 

	*  [Blockchain: la revolución industrial de internet](https://www.fnac.es/a6672920/Alexander-Preukschat-Blockchain-la-revolucion-industrial-de-internet#omnsearchpos=1) 
	*  [La nueva economía blockchain y criptomonedas en 100 preguntas](https://www.fnac.es/a7011173/La-nueva-economia-blockchain-y-criptomonedas-en-100-preguntas#omnsearchpos=5) 
	* Aprende BlockChain - Javier Villar



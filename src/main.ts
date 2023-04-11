import { FacadeDemo } from './structural/facade';
import { SingletonDemo } from './creational/singleton';
import { FactoryDemo } from './creational/factory';
import { AbstractFactoryDemo } from './creational/abstract-factory';
import { PrototypeDemo } from './creational/prototype';
import { BridgeDemo } from './structural/bridge';
import { DecoratorDemo } from './structural/decorator';
import { ProxyDemo } from './structural/proxy';
import { CompositeDemo } from './structural/composite';
import { AdapterDemo } from './structural/adapter';
import { BuilderDemo } from './creational/builder';
import { ObserverDemo } from './behavioral/observer';
import { MediatorDemo } from './behavioral/mediator';
import { StateDemo } from './behavioral/state';
import { StrategyDemo } from './behavioral/strategy';
import { TemplateMethodDemo } from './behavioral/template-method';
import { ChainOfResponsibilityDemo } from './behavioral/chain-of-responsibility';
import { CommandDemo } from './behavioral/command';

class App {
    constructor() {
        // creational
        new FacadeDemo();
        new SingletonDemo();
        new FactoryDemo();
        new AbstractFactoryDemo();
        new PrototypeDemo();
        new BuilderDemo();

        // structural
        new BridgeDemo();
        new DecoratorDemo();
        new ProxyDemo();
        new CompositeDemo();
        new AdapterDemo();

        // behavioral
        new ObserverDemo();
        new MediatorDemo();
        new StateDemo();
        new StrategyDemo();
        new TemplateMethodDemo();
        new CommandDemo();
        new ChainOfResponsibilityDemo();
    }
}

new App();

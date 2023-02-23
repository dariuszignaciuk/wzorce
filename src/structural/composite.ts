/**
 * The base Component class declares common operations for both simple and
 * complex objects of a composition.
 */
abstract class PackageComponent {
    protected parent!: PackageComponent | null;

    /**
     * Optionally, the base Component can declare an interface for setting and
     * accessing a parent of the component in a tree structure. It can also
     * provide some default implementation for these methods.
     */
    public setParent(parent: PackageComponent | null) {
        this.parent = parent;
    }

    public getParent(): PackageComponent | null {
        return this.parent;
    }

    /**
     * In some cases, it would be beneficial to define the child-management
     * operations right in the base Component class. This way, you won't need to
     * expose any concrete component classes to the client code, even during the
     * object tree assembly. The downside is that these methods will be empty
     * for the leaf-level components.
     */
    public add(component: PackageComponent): void {}

    public remove(component: PackageComponent): void {}

    /**
     * The base Component may implement some default behavior or leave it to
     * concrete classes (by declaring the method containing the behavior as
     * "abstract").
     */
    public abstract getWeight(): number;
}

/**
 * The Nail class represents the end objects of a composition. A leaf can't have
 * any children.
 *
 * Usually, it's the Leaf objects that do the actual work, whereas Composite
 * objects only delegate to their sub-components.
 */
class Nail extends PackageComponent {
    public getWeight(): number {
        return 5;
    }
}

/**
 * The NailBox class represents the complex components that may have children.
 */
class NailBox extends PackageComponent {
    protected children: PackageComponent[] = [];

    /**
     * A composite object can add or remove other components (both simple or
     * complex) to or from its child list.
     */
    public add(component: PackageComponent): void {
        this.children.push(component);
        component.setParent(this);
    }

    public remove(component: PackageComponent): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);

        component.setParent(null);
    }

    /**
     * The Composite executes its primary logic in a particular way. It
     * traverses recursively through all its children, collecting and summing
     * their results. Since the composite's children pass these calls to their
     * children and so forth, the whole object tree is traversed as a result.
     */
    public getWeight(): number {
        let result = 1; // weight of box itself
        for (const child of this.children) {
            result += child.getWeight();
        }

        return result;
    }
}

/**
 * The client code works with all of the components via the base interface.
 * This way the client code can support the simple nail components as well as the complex nail boxes.
 */
export class CompositeDemo {
    constructor() {
        console.warn('CompositeDemo');
        const nail = new Nail();

        const nailPackage1 = new NailBox();
        nailPackage1.add(nail);
        nailPackage1.add(nail);
        nailPackage1.add(nail);

        const nailPackage2 = new NailBox();
        nailPackage2.add(nail);

        const bigBoxOfNails = new NailBox();
        bigBoxOfNails.add(nailPackage1);
        bigBoxOfNails.add(nailPackage2);

        console.log('totalPackageWeight:', bigBoxOfNails.getWeight());
    }
}

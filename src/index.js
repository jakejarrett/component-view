/**
 * Attribute decorator
 *
 * This provides a decorator for the any module to add in properties/attributes on the root.
 *
 * @param attribute {String} The attribute/property you wish to apply.
 * @param value {String} The initial value of the property/attribute.
 * @returns {Function} The active decorator
 */
export function attribute(attribute, value) {
    /**
     * Return a decorator function
     */
    return function decorator(target) {
        target.prototype[attribute] = value;
    };
}

import App from "app/app";
import Marionette, { View } from "marionette";

@attribute("components", {})
@attribute("componentChannels", {})
class ComponentView extends View {

    /**
     * Register the component.
     *
     * @param componentName {String} Name the component will be registered under.
     * @param component {HTMLElement} The component you're registering.
     * @param el {jQuery} Container/Element you're putting the component into.
     * @param properties {Object} Properties you wish to apply to the component.
     */
    registerComponent (componentName, component, el, properties) {
        let Component;

        if(App && App.Components) {
            Component = App.Components;
        } else {
            throw new Error("Unsupported");
        }
        Component.register(componentName, component, properties);

        let componentObject = Component.getComponent(componentName);

        /** Store references to the component & radio channels **/
        this.components[componentObject.elementName] = {
            element: componentObject.component,
            module: componentObject.componentModule
        };

        this.componentChannels[componentObject.elementName] = componentObject.radioChannel || {};

        el.append(componentObject.component);
    }

}


/**
 * Export the view
 *
 * @exports FeaturesView
 */
export default ComponentView;

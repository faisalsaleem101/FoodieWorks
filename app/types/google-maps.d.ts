declare namespace google {
  namespace maps {
    namespace places {
      class Autocomplete {
        constructor(inputField: HTMLInputElement, opts?: AutocompleteOptions);
        addListener(eventName: string, handler: Function): void;
        getPlace(): AutocompleteResult;
      }
    }

    interface AutocompleteOptions {
      types?: string[];
      componentRestrictions?: {
        country: string | string[];
      };
    }

    interface AutocompleteResult {
      address_components: {
        long_name: string;
        short_name: string;
        types: string[];
      }[];
      formatted_address: string;
      geometry: {
        location: {
          lat: () => number;
          lng: () => number;
        };
        viewport: {
          getNorthEast: () => { lat: () => number; lng: () => number };
          getSouthWest: () => { lat: () => number; lng: () => number };
        };
      };
      place_id: string;
    }
  }
}

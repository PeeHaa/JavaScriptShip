function Settings() {
    this.persistentConfig = null;
    this.values = {
        music: {
            enabled: true,
            volume: 100
        }
    };

    this.initialize = function() {
        persistentConfig = localStorage.getItem('config');

        if (persistentConfig === null) {
            this.persist();
            return this;
        }

        this.values = this.merge(true, this.values, JSON.parse(persistentConfig));

        return this;
    };

    /**
     * !!!WARNING DRAGONS BE HERE!!!
     *
     * Object merge method based on jQuery's Extend function (http://docs.jquery.com/Utilities/jQuery.extend).
     * With the addition that it doesn't merge values from localstorage which aren;t in the defaults.
     * This can happen when config values have become obsolete.
     *
     * This is really fugly as hell, but all solutions are ugly :(
     */
    this.merge = function() {
        var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;

        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }

        if (typeof target !== 'object')
            target = {};

        if ( length == i ) {
            target = this;
            --i;
        }

        for ( ; i < length; i++ )
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null )
                // Extend the base object
                for ( var name in options ) {
                    // prevent merging keys not in the defaults
                    if (typeof target[name] === 'undefined') {
                      continue;
                    }

                    var src = target[ name ], copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy )
                        continue;

                    // Recurse if we're merging object values
                    if ( deep && copy && typeof copy === "object" && !copy.nodeType )
                        target[ name ] = this.merge( deep,
                            // Never move original objects, clone them
                            src || ( copy.length != null ? [ ] : { } )
                        , copy );

                    // Don't bring in undefined values
                    else if ( copy !== undefined )
                        target[ name ] = copy;

                }

        // Return the modified object
        return target;
    }

    this.persist = function() {
        localStorage.setItem('config', JSON.stringify(this.values));
    };
}

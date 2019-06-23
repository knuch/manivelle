<?php

namespace App;

class Helper {
    public static function parseRepeater($custom, $id, $attributes){
        // get concerned keys
        $keys = [];
        foreach($attributes as $attr) {
        $matchingKeys = array_filter(array_keys($custom), function ($val) use ($id, $attr) {
            $regex = "/^$id"."_\d+_$attr/";
            return preg_match($regex, $val) > 0;
        });
        $keys = array_merge($keys, $matchingKeys);
        }

        // get concerned values
        $fields = array_intersect_key($custom, array_flip($keys));

        // count entities
        $count = count($fields)/count($attributes);

        // re-process the array
        $result = [];
        for($i=0; $i < $count; $i++) {
            foreach($attributes as $attr) {
                $key = implode('_', [$id, $i, $attr]);
                if (isset($fields[$key])) $result[$i][$attr] = $fields[$key];
            }
        }
        return $result;
    }
}

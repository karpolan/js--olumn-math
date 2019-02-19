# js-column-math
Column math methods, as humans do.

It was a test task on some Job interview.

## Task
Calculate the sum as humans do

```
   1234
 +  567
 ------
   1801
```

## Implementation
I've briefly created a function for adding.

Then I create almost the same function for subtraction.

After writing some tests I've discovered that functions don't work with negative numbers :(

So I rename old functions to *xxxPositive()* names and create a wrapping functions that change the math operations depending on positive or negative input values.

public static class EnumerableExtensions
{
    // Extension block
    extension<TSource>(IEnumerable<TSource> source) // extension members for IEnumerable<TSource>
    {
        // Extension property:
        public bool IsEmpty => !source.Any();

        // Extension method:
        //public IEnumerable<TSource> Where(Func<TSource, bool> predicate) { return source.Where(predicate); }
    }

    // extension block, with a receiver type only
    extension<TSource>(IEnumerable<TSource>) // static extension members for IEnumerable<Source>
    {
        // static extension method:
        public static IEnumerable<TSource> Combine(IEnumerable<TSource> first, IEnumerable<TSource> second) { return first.Concat(second); }

        // static extension property:
        public static double Identity => new Random().NextDouble();

        // static user defined operator:
        public static IEnumerable<TSource> operator +(IEnumerable<TSource> left, IEnumerable<TSource> right) => left.Concat(right);
    }
}